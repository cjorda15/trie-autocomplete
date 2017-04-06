import Node from "../scripts/node.js"
const text = "/usr/share/dict/words"
var fs = require("fs");
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

export default class Trie {
  constructor() {
    this.root =  new Node()
    this.count = 0
  }
///returns total count of words inserted
  count() {
    return this.count
  }
//inserts word by first checking if it is in fact a vailid word to insert
//splits words up and inserts into each node (or follow along the same node path if letter is already present in
//in the node children list)
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
//when inserted, leave the address on the node to be utilized later as a bread crumb like process or jumping point
      presentNode.children[char] = new Node();
      presentNode = presentNode.children[char]
      address += char
      presentNode.address = address


    })
    presentNode.isFinished = true;
    this.count ++
  }

//utilizes the address on the nodes as jumping point,
//a helper function for other methods
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

// with the findNode method, it pushes the address in if the address has a value of true for isFinished
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

      //recurisvy apply a forEach to all characters found in the node children to find all words with a value of true for isFinished(aka a word)

      Object.keys(nodes.children).forEach((char) => {
        filter(nodes.children[char])
      })
    }
    filter(nodes)
//with the suggested list, put it thrugh a bubbleSort method(descending order by
//each nodes selected property value)

    let superSuggest = this.bubbleSort(suggestion)

    return superSuggest
  }

//inserts each word in the dictionary
  populate() {
    dictionary.forEach(i=>{
      this.insert(i)
    })
  }

//with the select method, increment the word(if it has a finished value of true) by one to be later used by the suggest method
  select(word) {
    word.toLowerCase()
    let selection = this.findNode(word)

    selection.isFinished ? selection.selected++ : null
  }


//helper function for the suggestion array. Bubbles down by each of the suggested nodes selected property value
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
