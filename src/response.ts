export type SummarizerResponse = {
  meta: {
    id: string,
    node: string,
    ms: number,
  },
  data: {
    output: string,
    tokens: number,
  }
};
