
export default class Nodes {
  constructor(letters) {
    this.letters = letters;
    this.children = {};
    this.word = false
  }
}

module.exports = Nodes
///// initial value obvs needs eveything in place,
//// word finished set to false
//// needs a children object to orgainze its relations/address
//pass in letters obvs



//later can have trie god reassign all its properties
//with her methods


//letters to be ultized as "address"?
