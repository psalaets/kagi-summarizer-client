# kagi-summarizer-client

Client for the [Kagi Universal Summarizer API](https://help.kagi.com/kagi/api/summarizer.html).

## Install

```
npm install kagi-summarizer-client
```

## Example

```ts
import { create } from 'kagi-summarizer-client';

const summarizer = create({
  // Kagi Summarizer API token
  token: '...'
});

const urlResult = await summarizer.summarizeUrl('https://page.com/article');
console.log(urlResult.data.output);

const textResult = await summarizer.summarizeText('foo bar baz');
console.log(textResult.data.output);
```

## API

### `const summarizer = create(settings: Settings)`

Create a summarizer client with the given settings.

```ts
type Settings = {
  // Kagi Summarizer API token from https://kagi.com/settings?p=api
  token: string,
};
```

Returns: summarizer

### `summarizer.summarizeUrl(url: string, options = {})`

Summarize content on the web.

Your Kagi account will be charged $0.03 to $1.00 **per invocation** of
this function depending on content length and the engine selected.

Returns: `Promise<SummarizerResponse>`

```ts
type SummarizerResponse = {
  meta: {
    id: string,
    node: string,
    ms: number,
    // API balance remaining (USD)
    api_balance: number,
  },
  data: {
    // The summary
    output: string,
    tokens: number,
  }
};
```

### `summarizer.summarizeText(text: string, options = {})`

Summarize text.

Your Kagi account will be charged $0.03 to $1.00 **per invocation** of
this function depending on content length and the engine selected.

Returns: `Promise<SummarizerResponse>` (See typedef above)

## Options

`summarizeUrl` and `summarizeText` both accept an optional `Options` object as
the 2nd parameter.

### Summary Engine

Specify the [summarization engine](https://help.kagi.com/kagi/api/summarizer.html#summarization-engines).

```ts
summarizer.summarizeUrl('https://page.com/article', {
  engine: 'cecil' // 'agnes', 'daphne', 'muriel'
});
```

### Summary Type

Specify the [summary type](https://help.kagi.com/kagi/api/summarizer.html#summary-types).

```ts
summarizer.summarizeUrl('https://page.com/article', {
  summaryType: 'summary', // 'takeaway'
});
```

### Output Language

```ts
import { languages } from 'kagi-summarizer-client';

summarizer.summarizeUrl('https://page.com/article', {
  targetLanguage: languages.Portuguese
});
```

### Kagi Cache Behavior

Whether to allow cached requests and responses.

```ts
summarizer.summarizeUrl('https://page.com/article', {
  cache: true
});
```

## Environment Requirements

- Fetch API (Node 18 or later)

## License

MIT
