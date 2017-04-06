import Node from "../scripts/node.js"
const text = "/usr/share/dict/words"
var fs = require("fs");
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

export default class Trie {
  constructor() {
    this.root =  new Node()
    this.count = 0
  }

  count() {
    return this.count
  }

  insert(word) {
    let presentNode = this.root;

    word.toLowerCase()
    let splitWord = word.split("")
    var address = ""

    splitWord.forEach(char=>{
      if (presentNode.children[char]) {
        address += char
        return presentNode = presentNode.children[char]
      }

      presentNode.children[char] = new Node();
      presentNode = presentNode.children[char]
      address += char
      presentNode.address = address


    })
    presentNode.isFinished = true;
    this.count ++
  }

  findNode(address) {
    if (!(typeof address === typeof "")) {
      return "umm, words contain letters sir"
    }
    address.toLowerCase()
    let presentNode = this.root;

    address.split("").forEach(char=>{
      if (presentNode.children[char]) {
        return presentNode = presentNode.children[char]
      }
    })
    return presentNode.address === address ?
    presentNode : "No droids here, move along, move along.."
  }

  suggest(word) {
    if (!word) {
      return word
    }
    word.toLowerCase()

    let nodes = this.findNode(word)
    var suggestion = []

    function filter(nodes) {
      if (nodes.isFinished) {
        suggestion.push(nodes.address)
      }
      Object.keys(nodes.children).forEach((char) => {
        filter(nodes.children[char])
      })
    }
    filter(nodes)

    let superSuggest = this.bubbleSort(suggestion)

    return superSuggest
  }

  populate() {
    dictionary.forEach(i=>{
      this.insert(i)
    })
  }

  select(word) {
    word.toLowerCase()
    let selection = this.findNode(word)

    selection.isFinished ? selection.selected++ : null
  }

  bubbleSort(arr) {

    if (arr.length < 1) {
      return arr
    }

    let counter = arr.length

    for (let i = 0; i < arr.length; i++) {

      for (let j = 0; j < counter; j++) {

        let swap = arr[j + 1]


        this.findNode((arr[j])).selected < this.findNode((arr[j + 1])).selected ? (arr[j + 1] = arr[j], arr[j] = swap) : null
      }
      counter--
    }
    return arr
  }
}
