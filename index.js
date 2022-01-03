import { u } from 'unist-builder'
import { findAndReplace } from 'mdast-util-find-and-replace'

export default function remarkAutomaticGlossaryMarkup({
  terms,
  withinNodeTypes = ['paragraph', 'root', 'list', 'listItem'],
}) {
  return (tree) => {
    terms.forEach((glossaryTerm) => {
      const caseInsensitiveRegex = new RegExp(
        `\\b${glossaryTerm.term}(?!\\])\\b`,
        'i'
      )
      let foundOnce = false
      findAndReplace(
        tree,
        caseInsensitiveRegex,
        function ($0) {
          if (!foundOnce) {
            foundOnce = true
            return u('link', { url: `#glossary-${encodeURIComponent($0)}` }, [
              u('text', $0),
            ])
          } else {
            return u('text', $0)
          }
        },
        {
          ignore: (node) => !withinNodeTypes.includes(node.type),
        }
      )
    })
  }
}
