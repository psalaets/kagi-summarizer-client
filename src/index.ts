import type { SummarizerResponse } from './response.js';
import type { Language } from './languages.js';

export type { SummarizerResponse } from './response.js'
export { languages } from './languages.js';

export type Settings = {
  /** Kagi Summarizer API token */
  token: string,
};

export type Options = {
  /** Summarizer engine to use */
  engine?: 'agnes' | 'daphne' | 'muriel',
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
      const queryParams = new URLSearchParams([
        ['url', url],
        ...Object.entries(options)
          .filter(([_, v]) => v != null)
          .map(([k, v]) => [k, String(v)])
      ]);

      return fetch(kagiUrl + '?' + queryParams, {
        method: 'GET',
        headers: headers(),
      })
        .then(resp => resp.json() as Promise<SummarizerResponse>);
    },
    summarizeText(text: string, options: Options = {}) {
      return fetch(kagiUrl, {
        method: 'POST',
        headers: headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
          text,
          ...options,
        }),
      })
        .then(resp => resp.json() as Promise<SummarizerResponse>);
    },
  };
};
