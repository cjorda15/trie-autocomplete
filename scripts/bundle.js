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
  constructor(letters = null) {
    this.letters = letters;
    this.children = {};
    this.address = "";
    this.isFinished = false;
    this.selected = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;


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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__ = __webpack_require__(0);

const text = "/usr/share/dict/words"
// var fs = require("fs");
// let dictionary = fs.readFileSync(text).toString().trim().split('\n')

class Trie {
  constructor() {
    this.root =  new __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__["a" /* default */]()
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

      presentNode.children[char] = new __WEBPACK_IMPORTED_MODULE_0__scripts_node_js__["a" /* default */](char);
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
    // return suggestion

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


        this.findNode((arr[j])).selected <this.findNode((arr[j+1])).selected ? (arr[j + 1] = arr[j], arr[j] = swap) : null
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



const text = "/usr/share/dict/words"

// import fs from "fs"
// let dictionary = fs.readFileSync(text).toString().trim().split('\n')

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
    wordContainer.prepend(i).prepend(`<br>`)

  })
})


/***/ })
/******/ ]);