import {assert} from "chai"
import Trie from '../scripts/trie.js'
import Node from "../scripts/node.js"


describe("The Trie",()=>{
    var trie = new Trie()

  it("should be a instance of the Trie class",()=>{

    assert.instanceOf(trie, Trie)
  })

  it("should have a root value of null",() =>{

    assert.equal(trie.root,null)
  })

  it("should start with no children",() =>{

    assert.deepEqual(trie.children,{})
  })



})
