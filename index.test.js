import remark from 'remark'
import plugin from '.'

const terms = [{ term: 'Lens SDK' }, { term: 'JSON' }]

describe('remark-automatic-glossary-markup', () => {
  test('Wraps a glossary term in a link located in a paragraph', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync('The Lens SDK is an easy to use SDK\n')
    expect(resultString.contents).toEqual('The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK\n')
  })

  test('Wraps a glossary term in a link located in a list item', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync('- The Lens SDK is an easy to use SDK\n')
    expect(resultString.contents).toEqual('-   The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK\n')
  })

  test('Wraps a glossary term in a link located in a numbered list item', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync('1. The Lens SDK is an easy to use SDK\n')
    expect(resultString.contents).toEqual('1.  The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK\n')
  })

  test('Wraps a multiple terms located in the same paragraph', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync('The Lens SDK is an easy to use SDK and uses JSON\n')
    expect(resultString.contents).toEqual(
      'The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK and uses [JSON](#glossary-JSON)\n'
    )
  })

  test('Only wraps the first of a specific term that occurs in a single line.', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync(
      'The Lens SDK is an easy to use SDK.  It is the only Lens SDK you will ever need.\n'
    )
    expect(resultString.contents).toEqual(
      'The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK.  It is the only Lens SDK you will ever need.\n'
    )
  })

  test('Only wraps the first of a specific term that occurs in multiple lines.', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync(
      'The Lens SDK is an easy to use SDK.\nIt is the only Lens SDK you will ever need.\n'
    )
    expect(resultString.contents).toEqual(
      'The [Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK.\nIt is the only Lens SDK you will ever need.\n'
    )
  })

  test('Will not rewrap a term that is already in a link', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const resultString = processor.processSync('The \\[Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK\n')
    expect(resultString.contents).toEqual('The \\[Lens SDK](#glossary-Lens%20SDK) is an easy to use SDK\n')
  })

  test('Will not wrap a term that is in a header', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const markdownHeader = '# The Lens SDK\n'

    const resultString = processor.processSync(markdownHeader)
    expect(resultString.contents).toEqual(markdownHeader)
  })

  test('Will not wrap a term that is code', () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const markdownWithCode = "Don't wrap a term in a code block `JSON The Lens SDK`\n"

    const resultString = processor.processSync(markdownWithCode)
    expect(resultString.contents).toEqual(markdownWithCode)
  })

  test("Don't add a reference to link", () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const markdownWithCode = '[JSON Website](https://www.json.org/)\n'

    const resultString = processor.processSync(markdownWithCode)
    expect(resultString.contents).toEqual(markdownWithCode)
  })

  test("Don't wrap just part of a word", () => {
    // Create our processor with our plugin
    const processor = remark().use(plugin, { terms })

    const markdownWithCode = 'You can use this JSONIZER to do this work\n'

    const resultString = processor.processSync(markdownWithCode)
    expect(resultString.contents).toEqual(markdownWithCode)
  })
})
