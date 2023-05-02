export function validateUrl(url: string) {
  try {
    new URL(url);
  } catch (e) {
    throw new Error(`Invalid url: ${url}`);
  }
}

export function validateText(text: string) {
  if (!text || text.trim().length === 0) {
    throw new Error(`Cannot summarize blank text`);
  }
}
