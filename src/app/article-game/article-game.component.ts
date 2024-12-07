import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-game',
  templateUrl: './article-game.component.html',
  styleUrl: './article-game.component.css'
})
export class ArticleGameComponent implements OnInit {

  words : any = [{
    "singolare_nome" : "Libro",
    "plurale_nome" :"Libri",
    "genere":"maschile",
    "articolo_determinativo_singolare":"il",
    "articolo_determinativo_plurale":"i",
    "articolo_indeterminativo_singolare":"un",
    "articolo_indeterminativo_plurale":"dei",
    "livello" : "A1"
  },
  {
    "singolare_nome" : "Tavolo",
    "plurale_nome" :"Tavoli",
    "genere":"maschile",
    "articolo_determinativo_singolare":"il",
    "articolo_determinativo_plurale":"i",
    "articolo_indeterminativo_singolare":"un",
    "articolo_indeterminativo_plurale":"dei",
    "livello" : "A1"
  },
  {
    "singolare_nome" : "Amico",
    "plurale_nome" :"Amici",
    "genere":"maschile",
    "articolo_determinativo_singolare":"l'",
    "articolo_determinativo_plurale":"gli",
    "articolo_indeterminativo_singolare":"un",
    "articolo_indeterminativo_plurale":"degli",
    "livello" : "A1"
  }
] 

  is_singular_selected = true
  is_plural_selected = false
  is_definite_selected = true
  is_indefinite_selected = false

  singular_or_plural_answer = ""
  definite_article_answer = ""
  indefinite_article_answer = ""

  is_singular_or_plural_answer_correct = false
  is_definite_article_answer_correct = false
  is_indefinite_article_answer_correct = false

  is_game_component_visible = false
  is_check_answers_clicked = false

  is_given_word_singular = false

  selected_word : any = {}
  ngOnInit(): void {



  }

  startGame(){
    this.is_game_component_visible=true
    this.loadNextWord()
  }

  checkAnswers(){
    if(this.is_given_word_singular){
      this.is_singular_or_plural_answer_correct =  this.singular_or_plural_answer.toLowerCase() == this.selected_word.plurale_nome.toLowerCase()
      this.is_definite_article_answer_correct = this.definite_article_answer.toLowerCase() == this.selected_word.articolo_determinativo_singolare.toLowerCase()
      this.is_indefinite_article_answer_correct = this.indefinite_article_answer.toLowerCase() == this.selected_word.articolo_indeterminativo_singolare.toLowerCase()
    }else{
      this.is_singular_or_plural_answer_correct = this.singular_or_plural_answer.toLowerCase() == this.selected_word.singolare_nome.toLowerCase()
      this.is_definite_article_answer_correct = this.definite_article_answer.toLowerCase() == this.selected_word.articolo_determinativo_plurale.toLowerCase()
      this.is_indefinite_article_answer_correct = this.indefinite_article_answer.toLowerCase() == this.selected_word.articolo_indeterminativo_plurale.toLowerCase()
    }
    this.is_check_answers_clicked = true 
  }

  loadNextWord(){
    
    this.resetInputFields()
    this.is_check_answers_clicked = false
    this.selected_word = this.words[Math.floor(Math.random() * this.words.length)]

    if (this.is_singular_selected && this.is_plural_selected){
      if(Math.random() > 0.5){
        this.is_given_word_singular = true
      }else{
        this.is_given_word_singular = false
      }
    }else{
      this.is_given_word_singular = this.is_singular_selected
    }
  }

  finishGame(){

    this.resetInputFields()
    this.is_game_component_visible = false
    this.selected_word = {}

  }

  resetInputFields(){
    this.singular_or_plural_answer = ""
    this.definite_article_answer = ""
    this.indefinite_article_answer = ""
  }

}
