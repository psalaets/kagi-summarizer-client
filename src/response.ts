type CommonResponse = {
  meta: {
    id: string,
    node: string,
    ms: number,
  },
};

type SuccessResponse = CommonResponse & {
  data: {
    output: string,
    tokens: number,
  },
  error: undefined,
};

type FailureResponse = CommonResponse & {
  data: undefined,
  error: Array<{
    code: number,
    msg: string,
    ref: unknown,
  }>,
};

export type SummarizerResponse = SuccessResponse | FailureResponse;

export function extractError(resp: Response) {
  return resp.json()
    .then(json => {
      if (!resp.ok || json.error) {
        return {
          status: resp.status,
          statusText: resp.statusText,
          message: (json.error && json.error[0]?.msg) ?? 'Unknown failure',
        };
      } else {
        return null;
      }
    });
}
