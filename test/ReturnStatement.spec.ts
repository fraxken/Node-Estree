import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

describe('ReturnStatement', () => {
  test('should be correctly rendered with no argument', () => {
    const node = ESTree.ReturnStatement()

    expect(node.type).toStrictEqual('ReturnStatement')

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('return;;\n')
  })

  test('ReturnStatement should be correctly rendered', () => {
    const argument = ESTree.Literal(true)
    const node = ESTree.ReturnStatement(argument)

    expect(node.type).toStrictEqual('ReturnStatement')
    expect(node.argument).toStrictEqual(argument)

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('return true;;\n')
  })
})
