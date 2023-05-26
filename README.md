# kagi-summarizer-client

Wrapper for the [Kagi Universal Summarizer API](https://help.kagi.com/kagi/api/summarizer.html).

## Install

`npm install kagi-summarizer-client`

## Example

```ts
import { create } from 'kagi-summarizer-client';

const summarizer = create({
  // Kagi Summarizer API token
  token: '...'
});

const urlResult = await summarizer.summarizeUrl('https://page.com/article');
console.log(urlResult.data.output);

const textResult = await summarizer.summarizeText('lorem ipsum');
console.log(textResult.data.output);
```

## API

### `const summarizer = create(settings: Settings)`

Create a summarizer client with the given settings.

```ts
type Settings = {
  /** Kagi Summarizer API token */
  token: string,
};
```

Returns: summarizer

### `summarizer.summarizeUrl(url: string, options: Options = {})`

Summarize some content on the web.

Note: Your Kagi account will be charged $0.03 to $1.00 **per invocation** of
this function depending on content length and the engine selected.

Returns: `Promise<SummarizerResponse>`

```ts
type SummarizerResponse = {
  meta: {
    id: string,
    node: string,
    ms: number,
  },
  data: {
    output: string, // This is the summary
    tokens: number,
  }
};
```

### `summarizer.summarizeText(text: string, options: Options = {})`

Summarize some text.

Note: Your Kagi account will be charged $0.03 to $1.00 **per invocation** of
this function depending on content length and the engine selected.

Returns: `Promise<SummarizerResponse>` (See above)

## Options

`summarizeUrl` and `summarizeText` both accept an optional `Options` object as
the 2nd parameter.

### Summary Engine

```ts
summarizer.summarizeUrl('https://page.com/article', {
  engine: 'cecil' // 'agnes', 'daphne', 'muriel'
});
```

### Summary Format

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
