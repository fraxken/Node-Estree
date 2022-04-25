import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

describe('BreakStatement', () => {
  test('should be correctly rendered with no argument', () => {
    const node = ESTree.BreakStatement()

    expect(node.type).toStrictEqual('BreakStatement')
    expect(node.label).toBeNull()

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('break;;\n')
  })

  test('BreakStatement should be correctly rendered', () => {
    const identifier = ESTree.Identifier('identifier')
    const node = ESTree.BreakStatement(identifier)

    expect(node.type).toStrictEqual('BreakStatement')
    expect(node.label).toStrictEqual(identifier)

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('break identifier;;\n')
  })
})
