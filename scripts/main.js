
import Trie from "./trie.js"
import Node from "../scripts/node.js"
const text = "/usr/share/dict/words"

import fs from "fs"
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

var trie = new Trie()
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
    wordContainer.prepend(i).prepend(<br>)

  })
})
