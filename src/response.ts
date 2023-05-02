export type SummarizerResponse = {
  meta: {
    id: string,
    node: string,
    ms: number,
  },
  data: {
    output: string,
    tokens: number,
  },
};

export function extractError(resp: Response, json: any) {
  if (!resp.ok || json.error) {
    return {
      status: resp.status,
      statusText: resp.statusText,
      message: (json.error && json.error[0]?.msg) ?? 'Unknown failure',
    };
  } else {
    return null;
  }
}
