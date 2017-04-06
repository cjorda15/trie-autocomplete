import {assert} from "chai"
import Trie from '../scripts/trie.js'
import Node from "../scripts/node.js"
import locus from "locus"

describe("The Trie", ()=>{
  var trie = new Trie()

  it("should be a instance of the Trie class", ()=>{

    assert.instanceOf(trie, Trie)
  })

  it("should have a root instance by the Node class", () =>{

    assert.instanceOf(trie.root, Node)
  })

  it("should start with no word-count", ()=>{

    assert.equal(trie.count, 0)
  })

  it("should add words, count them up, and recognize a finished word", () => {
    assert.equal(trie.count, 0)
    trie.insert("ball")
    assert.equal(trie.count, 1)
    assert.equal(trie.root.children.b.children.a.children.l.children.l.address, 'ball')
    assert.equal(trie.root.children.b.children.a.children.l.children.l.isFinished, true)
    trie.insert("balls")
    assert.equal(trie.count, 2)
    assert.equal(trie.root.children.b.children.a.children.l.children.l.children.s.address, 'balls')
    assert.equal(trie.root.children.b.children.a.children.l.children.l.children.s.isFinished, true)
  })


  it("should tell whether it is a finished word or not", () => {

    trie.insert("gravy")
    assert.equal(trie.root.children.g.isFinished, false)
    assert.equal(trie.root.children.g.children.r.children.a.children.v.isFinished, false)
    assert.equal(trie.root.children.g.children.r.children.a.children.v.children.y.isFinished, true)
  })

  it("should find the correct node address", ()=>{

    trie.insert("soccer")
    assert.equal(trie.findNode("s").address, "s")
    assert.equal(trie.findNode("so").address, "so")
    assert.equal(trie.findNode("socc").address, "socc")
    assert.equal(trie.findNode("socce").address, "socce")
    assert.equal(trie.findNode("soccer").address, "soccer")
  })

  it("should know it is not a word", ()=> {

    assert.equal(trie.findNode("gibaliegoop"), 'No droids here, move along, move along..')
  })

  it("should recognize that it isn't a string", ()=>{

    assert.equal(trie.findNode(1), "umm, words contain letters sir")
    assert.equal(trie.findNode(true), "umm, words contain letters sir")
    assert.equal(trie.findNode(false), "umm, words contain letters sir")
    assert.equal(trie.findNode(), "umm, words contain letters sir")
    assert.equal(trie.findNode(null), "umm, words contain letters sir")
    assert.equal(trie.findNode(1), "umm, words contain letters sir")
  })


  it("should return suggested words", () => {

    assert.deepEqual(trie.suggest("b"), ["ball", "balls"])
    assert.deepEqual(trie.suggest('balls'), ['balls'])
    assert.deepEqual(trie.suggest("g"), ["gravy"])
  })

  it("should populate the whole dictionary", ()=>{
    trie.populate()
    assert.equal(trie.count, 235890)
    assert.equal(trie.root.children.a.children.a.children.l.address, "aal")
  })

  it("should select a word and arrange the suggestion ", ()=>{

    assert.deepEqual(trie.suggest("pizz"), ['pizza', 'pizzeria', 'pizzicato', 'pizzle' ])

    trie.select("pizzle")
    trie.select("pizzle")
    trie.select("pizzle")
    trie.select("pizzeria")
    trie.select("pizzeria")
    trie.select("pizzicato")

    assert.deepEqual( trie.suggest("pizz"),['pizzle', 'pizzeria', 'pizzicato', 'pizza'])

  })


})
