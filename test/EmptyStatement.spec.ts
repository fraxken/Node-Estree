import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

test('EmptyStatement should be correctly rendered', () => {
  const node = ESTree.EmptyStatement()
  expect(node.type).toStrictEqual('EmptyStatement')
  expect(astring.generate(createLineProgram(node))).toStrictEqual(';;\n')
})
