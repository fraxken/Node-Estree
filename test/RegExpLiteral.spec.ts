import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

test('RegExpLiteral should be correctly rendered', () => {
  expectRegExpLiteralRender('^\\d+$', 'g', '/^\\d+$/g;\n')
  expectRegExpLiteralRender('[0-9]*', 'ig', '/[0-9]*/ig;\n')
  expectRegExpLiteralRender('([A-Z])', '', '/([A-Z])/;\n')
})

function expectRegExpLiteralRender(
  pattern: string,
  flags: string,
  expectedRender: string
) {
  const node = ESTree.RegExpLiteral(pattern, flags)

  expect(node.regex.pattern).toStrictEqual(pattern)
  expect(node.regex.flags).toStrictEqual(flags)

  const render = astring.generate(createLineProgram(node))
  expect(render).toStrictEqual(expectedRender)
}
