
export default class Node {
  constructor(letters = null) {
    this.letters = letters;
    this.children = {};
    this.address;
    this.isFinished = false
  }
}

//keep in mind , this has to work for the trie
//and all the children of the trie

///// initial value obvs needs eveything in place,
//// word finished set to false
//// needs a children object to orgainze its relations
//pass in letters obvs

//address get added on like bread-crumbs

//later can have trie god reassign all its properties with her methods


//letters to be ultized as "address"?
//more than likely fool...
