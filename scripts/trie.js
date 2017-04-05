import Node from "../scripts/node.js"
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
    let splitWord = word.split("")
    var address = ""

    splitWord.forEach(char=>{
      if (presentNode.children[char]) {
        address += char
        return presentNode = presentNode.children[char]
      }

      presentNode.children[char] = new Node(char);
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
    let presentNode = this.root;

    address.split("").forEach(char=>{
      if (presentNode.children[char]) {
        return presentNode = presentNode.children[char]
      }
    })
    return presentNode.address === address ?
    presentNode : "No droids here, move along, move along.."
  }

  suggest(text) {
    let nodes = this.findNode(text)
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
    return suggestion
  }


}



// move through nodes and find one that corresponds with
// address if none return not found or some error
//         findNode(address) {
//   let presentNode = this.root;
//   let splitWord = word.split("")
//
//   // move through nodes
//   splitWord.forEach(char=>{
//     if (presentNode.children[char]) {
//       return presentNode = presentNode.children[char]
//     }
// }
// }
// // needs to return array of child words
// // find node for address
// // check if all children are words and add to result array
// // call function on all children
// //   suggest(address) {}
