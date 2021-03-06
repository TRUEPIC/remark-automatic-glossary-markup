# Remark Automatic Glossary Markup

[@truepic/remark-automatic-glossary-markup](https://www.npmjs.com/package/@truepic/remark-automatic-glossary-markup)

This is a simple and straightforward remark plugin that, when given a list of
glossary terms, will wrap the first occurrence of that term within a paragraph
of the text within the markdown file inside a link. That way you don't manually
have to search the text of your markdown files to highlight glossary terms. You
can just do it automatically!!

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

This plugin would wrap the first instance of the term **API** inside a paragraph
of the markdown file like this:

```md
# We have a great API

Our [API](#glossary-API) is the best. Any time you use our API you will love it!
```

Notice that it didn't add a link to the header element, or the second instance
of the word API. Links will only ever be added to the first occurrence of the
word in a paragraph or list item within a single markdown file.

You can then listen for clicks on links that have a URL that starts with
`#glossary-` and show your user the glossary term with a tooltip or a popup when
they click the link.

## Usage

```shell
$ npm install @truepic/remark-automatic-glossary-markup
```

This package is a remark plugin that you can use like any other remark plugin.
You must provide the terms that you would like to be marked up to this plugin by
passing it as the second parameter when instantiating the plugin like this:

```js
import remark from 'remark'
import remarkAutomaticGlossaryMarkup from 'remark-automatic-glossary-markup'

remark().use(remarkAutomaticGlossaryMarkup, {
  terms: [{ term: 'API' }],
})
```

NOTE: When the links are added to your markdown, the term will be URL encoded
and appended to `#glossary-`. So if you had a term like `Big Fish` the link that
would be created would be `#glossary-Big%20Fish`. You should trim the
`#glossary-` off the front of the link and use `decodeURIComponent()` on the
remaining part of the link to get at the original term.

## Development

The only prerequisite is a compatible version of Node.js (see `engines.node` in
`package.json`).

### Dependencies

Install dependencies with npm:

```shell
$ npm install
```

### Testing

To run the tests just run:

```shell
$ npm run test
```

### Code Style & Linting

[Prettier](https://prettier.com/) is setup to enforce a consistent code style.
It's highly recommended to
[add an integration to your editor](https://prettier.io/docs/en/editors.html)
that automatically formats on save.

[ESLint](https://eslint.org/) is setup with the
["recommended" rules](https://eslint.org/docs/rules/) to enforce a level of code
quality. It's also highly recommended to
[add an integration to your editor](https://eslint.org/docs/user-guide/integrations#editors)
that automatically formats on save.

To run via the command line:

```shell
$ npm run lint
```

This is run automatically by CircleCI as part of the build process.

### Releasing

[Release It!](https://github.com/release-it/release-it) is used to automate the
tagging and pushing of releases. When the `development` branch is ready, start
the process via the command line:

```shell
$ npm run release
```

Once complete, manually merge the `development` branch into the `main` branch.
The `main` branch should always contain the latest release.
