import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dictionary-game',
  templateUrl: './dictionary-game.component.html',
  styleUrl: './dictionary-game.component.css'
})
export class DictionaryGameComponent implements OnInit {

  from_language = "Italian"
  to_language = "English"

  is_game_component_visible = false
  is_check_answers_clicked = false

  is_answer_correct = false

  answer =  ""

  words = [
    {
        "Italian":"libro",
        "English":"book",
        "Level" : "A1"
    },
    {
        "Italian":"casa",
        "English":"house",
        "Level" : "A1"
    },
    {
        "Italian":"banca",
        "English":"bank",
        "Level" : "A1"
    },
    {
        "Italian":"tavolo",
        "English":"table",
        "Level" : "A1"
    },
    {
        "Italian":"sedia",
        "English":"chair",
        "Level" : "A1"
    }
  ]

  selected_word : any = {}

  ngOnInit(): void {
    this.resetInputFields()

    
  }

  startGame(){
    this.is_game_component_visible=true
    this.loadNextWord()
  }

  checkAnswers(){
    
    this.is_check_answers_clicked = true 
    this.is_answer_correct = (this.selected_word[this.to_language] == this.answer)

  }

  loadNextWord(){
    
    this.resetInputFields()
    this.is_check_answers_clicked = false
    var index  =Math.floor(Math.random() * this.words.length)
    console.log(index)
    this.selected_word = this.words[index]

  }

  finishGame(){

    this.resetInputFields()
    this.is_game_component_visible = false
    this.selected_word = {}

  }

  resetInputFields(){
    this.answer = ""
  }

  switchLanguage(){
    var tmp = this.from_language
    this.from_language = this.to_language
    this.to_language = tmp
  }

}
