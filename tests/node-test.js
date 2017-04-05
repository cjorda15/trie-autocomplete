import {assert} from "chai"
import Node from "../scripts/node.js"

describe("The Node", ()=>{

  var node = new Node()

  it("should be an instance of the Node class", ()=>{

    assert.instanceOf(node, Node)
  })

  it("should have no children once initilized", ()=>{

    assert.deepEqual(node.children, {})
  })

  it("should start with a word value of false", () => {
    assert.equal( node.isFinished, false)

  })
})
