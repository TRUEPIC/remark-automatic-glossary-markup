# Remark Automatic Glossary Markup

[remark-automatic-glossary-markup](https://www.npmjs.com/package/remark-automatic-glossary-markup)

This is a simple and straightforward remark plugin that, when given a list of glossary terms, will wrap the first
occurrence of that term within a paragraph of the text within the markdown file inside a link. That way you don't
manually have to search the text of your markdown files to highlight glossary terms. You can just do it automatically!!

To demonstrate. Say you had a markdown file like this:

```md
# We have a great API

Our API is the best. Any time you use our API you will love it!
```

And you had a JSON list of terms like this:

```json
[
  {
    "term": "API",
    "definition": "Application Programming Interface"
  }
]
```

This plugin would wrap the first instance of the term **API** inside a paragraph of the markdown file like this:

```md
# We have a great API

Our [API](#glossary-API) is the best. Any time you use our API you will love it!
```

Notice that it didn't add a link to the header element, or the second instance of the word API. Links will only ever be
added to the first occurrence of the word in a paragraph or list item within a single markdown file.

You can then listen for clicks on links that have a URL that starts with `#glossary-` and show your user the glossary
term with a tooltip or a popup when they click the link.

## Usage

This package is a remark plugin that you can use like any other remark plugin. You must provide the terms that you would
like to be marked up to this plugin by passing it as the second parameter when instantiating the plugin like this:

```js
import remark from 'remark'
import remarkAutomaticGlossaryMarkup from 'remark-automatic-glossary-markup'

remark().use(remarkAutomaticGlossaryMarkup, {
  terms: [{ term: 'API' }],
})
```

When the links are added to your markdown, the term will be URL encoded and appended to `#glossary-`. So if you had a
term like `Big Fish` the link that would be created would be `#glossary-Big%20Fish`.

## Development

### Testing

To run the tests just run:

```shell
npm run test
```

### Releasing

To run the tests just run:

```shell
npm run release
```
