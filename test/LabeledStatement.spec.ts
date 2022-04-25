import * as astring from 'astring'
import { ESTree } from '../src/index'
import { createLineProgram } from './utils'

describe('LabeledStatement', () => {
  test('should be correctly rendered with empty statement', () => {
    const identifier = ESTree.Identifier('label')
    const statement = ESTree.EmptyStatement()
    const node = ESTree.LabeledStatement(identifier, statement)

    expect(node.type).toStrictEqual('LabeledStatement')
    expect(node.label).toStrictEqual(identifier)
    expect(node.body).toStrictEqual(statement)

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('label: ;;\n')
  })

  test('should be correctly rendered with block statement', () => {
    const identifier = ESTree.Identifier('label')
    const statement = ESTree.BlockStatement([
      ESTree.ReturnStatement(ESTree.Literal(true)),
    ])
    const node = ESTree.LabeledStatement(identifier, statement)

    expect(node.type).toStrictEqual('LabeledStatement')
    expect(node.label).toStrictEqual(identifier)
    expect(node.body).toStrictEqual(statement)

    const render = astring.generate(createLineProgram(node))
    expect(render).toStrictEqual('label: {\n  return true;\n};\n')
  })
})
