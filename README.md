# Remark Automatic Glossary Markup 

[remark-automatic-glossary-markup](https://www.npmjs.com/package/remark-automatic-glossary-markup)

This is a very simple and straightforward remark plugin that, when given a list of glossary terms, will wrap the first occurance of that term within a paragraph of the markdown file within a link.  That link will be to `#glossary-${urlEncodedGlossaryTerm}` which you can then use to drive your glossary behavior.