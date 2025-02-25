import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dictionary-game',
  templateUrl: './dictionary-game.component.html',
  styleUrl: './dictionary-game.component.css'
})
export class DictionaryGameComponent implements OnInit {

  isAuthenticated = false

  fromLanguage = "Italian"
  toLanguage = "English"

  isGameComponentVisible = false
  isCheckAnswersClicked = false

  isAnswerCorrect = false

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

  selectedWord : any = {}

  constructor(private authService: AuthService){}


  ngOnInit(): void {
    if (this.tokenValidation$) {
      this.tokenValidation$.subscribe((isValid) => {
        console.log(isValid)
        this.isAuthenticated = isValid?true:false
      });
    }
  }

  get tokenValidation$() {
    return this.authService.tokenValidation$!;
  }
  startGame(){
    this.isGameComponentVisible=true
    this.loadNextWord()
  }

  checkAnswers(){
    
    this.isCheckAnswersClicked = true 
    this.isAnswerCorrect = (this.selectedWord[this.toLanguage] == this.answer)

  }

  loadNextWord(){
    
    this.resetInputFields()
    this.isCheckAnswersClicked = false
    var index  =Math.floor(Math.random() * this.words.length)
    console.log(index)
    this.selectedWord = this.words[index]

  }

  finishGame(){

    this.resetInputFields()
    this.isGameComponentVisible = false
    this.selectedWord = {}

  }

  resetInputFields(){
    this.answer = ""
  }

  switchLanguage(){
    var tmp = this.fromLanguage
    this.fromLanguage = this.toLanguage
    this.toLanguage = tmp
  }

}
