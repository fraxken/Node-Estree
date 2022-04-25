import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

test('DebuggerStatement should be correctly rendered', () => {
  const node = ESTree.DebuggerStatement()

  expect(node.type).toStrictEqual('DebuggerStatement')

  const render = astring.generate(createLineProgram(node))
  expect(render).toStrictEqual('debugger;;\n')
})
