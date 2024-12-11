import { Component, OnInit } from '@angular/core';
import { ConjugationService } from '../_services/conjugation.service';

@Component({
  selector: 'app-conjugation-game',
  templateUrl: './conjugation-game.component.html',
  styleUrl: './conjugation-game.component.css'
})
export class ConjugationGameComponent  implements OnInit {

  pronomi_soggetto = ["io","tu","lui","noi","voi","loro"]

  verbs : any = ["avere","mangiare","andare","venire","volere" ]

  selected_verb : any = {}


  answers : any = {
    "presente":{},
    "passato_prossimo":{},
    "futuro_semplice":{}
  }

  is_present_tense_selected = true
  is_past_tense_selected = false
  is_future_tense_selected = false

  is_game_component_visible = false
  is_check_answers_clicked = false

  constructor(private conjugationService: ConjugationService){}

  ngOnInit(){
    this.resetInputFields()
  }

  startGame(){
    this.is_game_component_visible=true
    this.loadNextWord()
  }

  checkAnswers(){
    
    this.is_check_answers_clicked = true 


    for (var tense of Object.keys(this.answers)) {
      if((tense =="presente" && !this.is_present_tense_selected) || 
         (tense =="passato_prossimo" && !this.is_past_tense_selected) ||
         (tense =="futuro_semplice" && !this.is_future_tense_selected) ){
          continue
      }
      for(var pronomi of Object.keys(this.answers[tense]) ){
        console.log(this.answers[tense][pronomi]["answer"] + " vs " + this.selected_verb["conjugations"][tense][pronomi])
        this.answers[tense][pronomi]["is_correct"] = (this.answers[tense][pronomi]["answer"] === this.selected_verb["conjugations"][tense][pronomi])
      }
    }
    
    console.log(this.answers)

  }

  loadNextWord(){
    
    this.resetInputFields()
    this.is_check_answers_clicked = false
    this.selected_verb["verb"] = this.verbs[Math.floor(Math.random() * this.verbs.length)]
    
    this.conjugationService.getConjugation(this.selected_verb.verb).subscribe(
      data=>{
        this.selected_verb["conjugations"] = data.result.indicativo

      },
      err => {
        console.log(err)
      }
    )

  }

  finishGame(){

    this.resetInputFields()
    this.is_game_component_visible = false
    this.selected_verb = {}

  }

  resetInputFields(){
    for(var pronomi of this.pronomi_soggetto){
      this.answers.presente[pronomi] = {"answer":"",is_correct:false}
      this.answers.passato_prossimo[pronomi] = {"answer":"",is_correct:false}
      this.answers.futuro_semplice[pronomi] = {"answer":"",is_correct:false}
    }
  }
}
