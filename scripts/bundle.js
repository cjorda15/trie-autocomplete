/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Node {
  constructor() {
    this.children = {};
    this.address = "";
    this.isFinished = false;
    this.selected = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__ = __webpack_require__(0);

const text = "/usr/share/dict/words"
var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

class Trie {
  constructor() {
    this.root =  new __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__["a" /* default */]()
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
      presentNode.children[char] = new __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__["a" /* default */]();
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Trie;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__trie_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__scripts_node_js__ = __webpack_require__(0);
throw new Error("Cannot find module \"fs\"");



const text = "/usr/share/dict/words"


let dictionary = __WEBPACK_IMPORTED_MODULE_2_fs___default.a.readFileSync(text).toString().trim().split('\n')

var trie = new __WEBPACK_IMPORTED_MODULE_0__trie_js__["a" /* default */]()
var textForm = document.getElementById('text-form')
var enterBtn = document.getElementById('enter-btn')
var wordContainer = document.getElementById("word-container")

textForm.addEventListener('keyup', function(){
  // trie.suggest(textInfo)
  // console.log(trie)
  // console.log(textInfo)
})


enterBtn.addEventListener('click',function(){
  wordContainer.innerHTML = ""

  let textInfo =
  document.getElementById("text-form").value
  console.log(trie.insert(textInfo))
  console.log(trie.suggest(textInfo))

  trie.suggest(textInfo).forEach(i=>{
    wordContainer.prepend(i)


  })
})


/***/ })
/******/ ]);