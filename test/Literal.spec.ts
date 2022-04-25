import * as astring from 'astring'
import { LiteralValue } from '../src/estree'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

test('Literal should be correctly rendered', () => {
  expectLiteralRender('value', '"value";\n')
  expectLiteralRender(true, 'true;\n')
  expectLiteralRender(1, '1;\n')
  expectLiteralRender(null, 'null;\n')
})

function expectLiteralRender(value: LiteralValue, expectedRender: string) {
  const node = ESTree.Literal(value)

  expect(node.value).toStrictEqual(value)

  const render = astring.generate(createLineProgram(node))
  expect(render).toStrictEqual(expectedRender)
}
