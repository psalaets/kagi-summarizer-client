import { SummarizerResponse, extractError } from './response.js';
import type { Language } from './languages.js';
import { validateText, validateUrl } from './validate.js';

export type { SummarizerResponse } from './response.js'
export { languages } from './languages.js';

export type Settings = {
  /** Kagi Summarizer API token */
  token: string,
};

export type Options = {
  /** Summarizer engine to use */
  engine?: 'cecil' | 'agnes' | 'daphne' | 'muriel',
  /** Summary format */
  summaryType?: 'summary' | 'takeaway',
  /** Desired summary language */
  targetLanguage?: Language,
  /** Allow cached responses? */
  cache?: boolean,
};

export function create(settings: Settings) {
  const kagiUrl = 'https://kagi.com/api/v0/summarize';
  const headers = (additional: Record<string, string> = {}) => ({
    Authorization: `Bot ${settings.token}`,
    Accept: 'application/json',
    ...additional,
  });

  return {
    summarizeUrl(url: string, options: Options = {}) {
      validateUrl(url);

      const queryParams = new URLSearchParams([
        ['url', url],
        ...Object.entries(toKagiNames(options))
          .filter(([_, v]) => v != null)
          .map(([k, v]) => [k, String(v)])
      ]);

      return fetch(kagiUrl + '?' + queryParams, {
        method: 'GET',
        headers: headers(),
      })
        .then(handleResponse);
    },
    summarizeText(text: string, options: Options = {}) {
      validateText(text);

      return fetch(kagiUrl, {
        method: 'POST',
        headers: headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
          text,
          ...toKagiNames(options),
        }),
      })
        .then(handleResponse);
    },
  };
};

function toKagiNames(options: Options) {
  const {targetLanguage, summaryType, ...others} = options;

  return {
    ...others,
    target_language: targetLanguage,
    summary_type: summaryType,
  };
}

function handleResponse(resp: Response) {
  return resp.json()
    .then(json => {
      const errorDetails = extractError(resp, json)
      if (errorDetails) {
        const err = new Error(errorDetails.message) as any;
        err.status = errorDetails.status;
        err.statusText = errorDetails.statusText;
        throw err;
      } else {
        return json as SummarizerResponse;
      }
    });
}
