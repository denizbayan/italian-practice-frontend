import { Component, OnInit } from '@angular/core';
import { ConjugationService } from '../_services/conjugation.service';

@Component({
  selector: 'app-conjugation-game',
  templateUrl: './conjugation-game.component.html',
  styleUrl: './conjugation-game.component.css'
})
export class ConjugationGameComponent  implements OnInit {

  pronomi_soggetto = ["io","tu","lui","noi","voi","loro"]

  verbs : any = [
        "essere","avere","andare","fare","mangiare",
        "bere","dormire","parlare","dire","abitare",
        "vivere","lavorare","leggere","scrivere","giocare",
        "suonare","camminare","correre","dare","regalare",
        "prendere","portare","aspettare","comprare","pagare",
        "volere", "dovere", "potere", "sapere", "conoscere",
        "incontrare","stare", "imparare", "studiare", "sentire",
        "ascoltare", "vedere", "guardare", "chiamere", "cucinare",
        "preparare", "nuotare", "pulire", "lavare", "offrire",
        "uscire", "viaggiare", "partire", "venire", "arrivare",
        "cominciare" ]

  selected_verb : any = {}


  answers : any = {
    "presente":{},
    "passato_prossimo":{},
    "futuro_semplice":{}
  }

  difficulty_levels = [ 
    {"label":"easy","hint_count":4},
    {"label":"medium","hint_count":2},
    {"label":"hard","hint_count":0}
  ]

  selected_difficulty = this.difficulty_levels[1]

  is_present_tense_selected = true
  is_past_tense_selected = false
  is_future_tense_selected = false

  is_game_component_visible = false
  is_check_answers_clicked = false

  constructor(private conjugationService: ConjugationService){}

  ngOnInit(){
    this.resetInputFields()
  }

  startRound(){
    this.is_game_component_visible=true
    this.resetInputFields()
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
    
    this.selected_verb["verb"] = this.verbs[Math.floor(Math.random() * this.verbs.length)]
    
    this.conjugationService.getConjugation(this.selected_verb.verb).subscribe(
      data=>{
        this.selected_verb["conjugations"] = data.result.indicativo
        this.addDifficultyBasedHints()
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
    this.is_check_answers_clicked = false
    for(var pronomi of this.pronomi_soggetto){
      this.answers.presente[pronomi] = {"answer":"",is_correct:false}
      this.answers.passato_prossimo[pronomi] = {"answer":"",is_correct:false}
      this.answers.futuro_semplice[pronomi] = {"answer":"",is_correct:false}
    }
  }

  addDifficultyBasedHints(){
    for (var tense of Object.keys(this.answers)) {
      var tmp_pronomi_soggetto = ["io","tu","lui","noi","voi","loro"]
      for (var i = 0 ; i< this.selected_difficulty.hint_count ; i++){
          var pronomi = tmp_pronomi_soggetto[Math.floor(Math.random() * tmp_pronomi_soggetto.length)]
          this.answers[tense][pronomi]["answer"]  =  this.selected_verb["conjugations"][tense][pronomi]
          this.answers[tense][pronomi]["is_correct"] = true
          tmp_pronomi_soggetto = tmp_pronomi_soggetto.filter(p => (p != pronomi))
      }
    }
  }
}
