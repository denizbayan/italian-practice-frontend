import { Component, OnInit } from '@angular/core';
import { ConjugationService } from '../_services/conjugation.service';
import { AuthService } from '../_services/auth.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { EnumEventName } from '../_structs/enums/enum.event_name';
import { TokenStorageService } from '../_services/token-storage.service';
import { EnumSessionStorageKeys } from '../_structs/enums/enum.session_storage_keys';
import { EnumGameType } from '../_structs/enums/enum.game_type';
import { EventService } from '../_services/event.service';
import { DatePipe } from '@angular/common';
  
interface Tense {
  optionLabel :string,
  answersLabel :string,
  mood : string,
  tense: string,
  code: string
}

@Component({
  selector: 'app-conjugation-game',
  templateUrl: './conjugation-game.component.html',
  styleUrl: './conjugation-game.component.css'
})


export class ConjugationGameComponent  implements OnInit {

  pronomiSoggetto = ["io","tu","lui","noi","voi","loro"]

  verbs : any = [
    {"italian":"essere", "english":"to be"},
    {"italian":"avere", "english":"to have"},
    {"italian":"andare", "english":"to go"},
    {"italian":"fare", "english":"to do"},
    {"italian":"volere", "english":"to want"},
    {"italian":"dovere", "english":"have to"},
    {"italian":"potere", "english":"can"},
    {"italian":"chiedere", "english":"to ask"},
    {"italian":"chiudere", "english":"to close"},
    {"italian":"mangiare", "english":"to eat"},
    {"italian":"bere", "english":"to drink"},
    {"italian":"correre", "english":"to run"},
    {"italian":"dare", "english":"to give"},
    {"italian":"sapere", "english":"to know things"},
    {"italian":"aprire", "english":"to open"},
    {"italian":"dormire", "english":"to sleep"},
    {"italian":"aspettare", "english":"to wait"},
    {"italian":"comprare", "english":"to buy"},
    {"italian":"pagare", "english":"to pay"},
    {"italian":"succedere","english":"to happen"},
    {"italian":"piacere","english":"to pleasure"},
    {"italian":"rimanere","english":"to stay"},
    {"italian":"cadere","english":"to fall"},
    {"italian":"tenere","english":"to hold"},
    {"italian":"parlare", "english":"to talk"},
    {"italian":"dire", "english":"to tell"},
    {"italian":"abitare", "english":"to live (in a place)"},
    {"italian":"vivere", "english":"to live"},
    {"italian":"lavorare", "english":"to work"},
    {"italian":"leggere", "english":"to read"},
    {"italian":"scrivere", "english":"to write"},
    {"italian":"giocare", "english":"to play a sport"},
    {"italian":"suonare", "english":"to play an instrument"},
    {"italian":"camminare", "english":"to walk"},
    {"italian":"tagliare", "english":"to cut"},
    {"italian":"decidere", "english":"to decide"},
    {"italian":"morire", "english":"to die"},
    {"italian":"nascere", "english":"to be born"},
    {"italian":"dividere", "english":"to divide"},
    {"italian":"rispondere", "english":"to answer"},
    {"italian":"vincere", "english":"to win"},
    {"italian":"ridere", "english":"to laugh"},
    {"italian":"riparare", "english":"to repair"},
    {"italian":"perdere", "english":"to lose/miss (a bus, not a person)"},
    {"italian":"rompere" ,  "english":"to break"},
    {"italian":"scegliere" ,"english":"to choose"},
    {"italian":"scendere" , "english":"to go down"},
    {"italian":"mettere",   "english":"to put"},
    {"italian":"prenotare" ,"english":"to book"},
    {"italian":"entrare" ,  "english":"to enter"},
    {"italian":"ordinare" , "english":"to order"},
    {"italian":"tornare" ,  "english":"to return"},
    {"italian":"preferire" ,"english":"to prefer"},
    {"italian":"adorare" ,  "english":"to adore"},
    {"italian":"odiare" ,   "english":"to hate"},
    {"italian":"costruire" ,"english":"to build"},
    {"italian":"insegnare" ,"english":"to teach"},
    {"italian":"vendere" ,  "english":"to sell"},
    {"italian":"assaggiare" ,"english":"to taste"},
    {"italian":"offendere" ,"english":"to offend"},
    {"italian":"guidare" ,"english":"to guide"},
    {"italian":"pranzare" ,"english":"to have lunch"},
    {"italian":"cenare" ,"english":"to have dinner"},
    {"italian":"ricorrere" ,"english":"to chase"},
    {"italian":"giurare" ,"english":"to swear"},
    {"italian":"trovare" ,"english":"to find"},
    {"italian":"sperare","english":"to hope"},
    {"italian":"contare","english":"to count"},
    {"italian":"comparire","english":"to appear"},
    {"italian":"succedere","english":"to happen"},
    {"italian":"piacere","english":"to pleasure"},
    {"italian":"rimanere","english":"to stay"},
    {"italian":"cadere","english":"to fall"},
    {"italian":"tenere","english":"to hold"},
    {"italian":"parlare", "english":"to talk"},
    {"italian":"dire", "english":"to tell"},
    {"italian":"abitare", "english":"to live (in a place)"},
    {"italian":"vivere", "english":"to live"},
    {"italian":"lavorare", "english":"to work"},
    {"italian":"leggere", "english":"to read"},
    {"italian":"scrivere", "english":"to write"},
    {"italian":"giocare", "english":"to play a sport"},
    {"italian":"suonare", "english":"to play an instrument"},
    {"italian":"camminare", "english":"to walk"},
    {"italian":"correre", "english":"to run"},
    {"italian":"dare", "english":"to give"},
    {"italian":"prendere", "english":"to take"},
    {"italian":"portare", "english":"to bring"},
    {"italian":"conoscere", "english":"to know people"},
    {"italian":"incontrare", "english":"to encounter"},
    {"italian":"stare", "english":"to stay"},
    {"italian":"imparare", "english":"to learn"},
    {"italian":"studiare", "english":"to study"},
    {"italian":"sentire", "english":"to feel"},
    {"italian":"ascoltare", "english":"to listen"},
    {"italian":"vedere", "english":"to see"},
    {"italian":"guardare", "english":"to watch"},
    {"italian":"chiamare", "english":"to call"},
    {"italian":"cucinare", "english":"to cook"},
    {"italian":"preparare", "english":"to prepare"},
    {"italian":"nuotare", "english":"to swim"},
    {"italian":"pulire", "english":"to clean"},
    {"italian":"lavare", "english":"to wash"},
    {"italian":"offrire", "english":"to offer"},
    {"italian":"uscire", "english":"to go out"},
    {"italian":"viaggiare", "english":"to travel"},
    {"italian":"partire", "english":"to leave"},
    {"italian":"venire", "english":"to come"},
    {"italian":"arrivare", "english":"to arrive"},
    {"italian":"cominciare", "english":"to start"},
    {"italian":"spiegare", "english":"to explain"},
    {"italian":"lamentarsi", "english":"to complain"},
    {"italian":"togliere", "english":"to remove/ take off"},
    {"italian":"raccogliere", "english":"to pick up"},
    {"italian":"risolvere", "english":"to solve"},
    {"italian":"coinvolgere", "english":"to involve"},
    {"italian":"piangere", "english":"to cry"},
    {"italian":"spegnere", "english":"to turn off"},
    {"italian":"convingere", "english":"to convince"},
    {"italian":"spingere", "english":"to push"},
    {"italian":"aggiungere", "english":"to add"},
    {"italian":"dipingere", "english":"to paint"},
    {"italian":"accorgersi", "english":"to realize"}
  ]

  /***
svegliarsi:wake up
alzarsi:get up
vestirsi:get dressed
lavarsi:wash
riposarsi:take a rest
noleggiare [to rent / to hire]
prendere in prestito [to borrow]
pelare – to peel
condire – to dress
friggere – to fry
scolare – to drain
grattugiare – to grate
bollire/lessare – to boil
affettare – to slice
sbucciare – to peel
versare – to pour
mescolare – to stir/to mix
cuocere nel forno – to bake
accendere – to light/to switch on
         */

  selectedVerb : any = {}


  difficultyLevels = [ 
    {"label":"Study Mode","hintCount":6},
    {"label":"Easy","hintCount":4},
    {"label":"Medium","hintCount":2},
    {"label":"Hard","hintCount":1},
    {"label":"No Hints","hintCount":0}
  ]

  selectedDifficulty = this.difficultyLevels[Math.floor(this.difficultyLevels.length/2)]

  isGameComponentVisible = false
  isCheckAnswersClicked = false

  answers : any = {
    "indicativo":{
      "presente":{},
      "passatoProssimo":{},
      "imperfetto":{},
      "futuroSemplice" :{}
    },
    "condizionale":{
      "presente":{},
      "passato":{}
    },
    "congiuntivo":{
      "presente":{},
      "passato":{},
      "imperfetto":{}
    },
    "imperativo":{
      "presente":{}
    },
    "gerundio":{
      "presente":{},
      "passato":{}
    }
  }

  IndicativoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Indicativo Presente",code: "indicativo_presente","mood":"indicativo","tense":"presente"},
    {optionLabel: "Passato Prossimo", answersLabel : "Indicativo Passato Prossimo",code: "indicativo_passatoProssimo","mood":"indicativo","tense":"passatoProssimo"},
    {optionLabel: "Imperfetto", answersLabel : "Indicativo Imperfetto",code: "indicativo_imperfetto","mood":"indicativo","tense":"imperfetto"},
    {optionLabel: "Futuro Semplice", answersLabel : "Indicativo Futuro Semplice",code: "indicativo_futuroSemplice","mood":"indicativo","tense":"futuroSemplice"}
  ];
  CondizionaleTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Condizionale Presente",code: "condizionale_presente","mood":"condizionale","tense":"presente"},
    {optionLabel: "Passato", answersLabel : "Condizionale Passato",code: "condizionale_passato","mood":"condizionale","tense":"passato"}
  ];
  CongiuntivoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Congiuntivo Presente",code: "congiuntivo_presente","mood":"congiuntivo","tense":"presente"},
    {optionLabel: "Passato", answersLabel : "Congiuntivo Passato",code: "congiuntivo_passato","mood":"congiuntivo","tense":"passato"},
    {optionLabel: "Imperfetto", answersLabel : "Congiuntivo Imperfetto",code: "congiuntivo_imperfetto","mood":"congiuntivo","tense":"imperfetto"}
  ];
  ImperativoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Imperativo Presente",code: "imperativo_presente","mood":"imperativo","tense":"presente"},
  ];
  GerundioTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Gerundio Presente",code: "gerundio_presente","mood":"gerundio","tense":"presente"},
    {optionLabel: "Passato", answersLabel : "Gerundio Passato",code: "gerundio_passato","mood":"gerundio","tense":"passato"}
  ];

  selectedIndicativoTenses: Tense[] = []
  selectedCondizionaleTenses: Tense[] = []
  selectedCongiuntivoTenses: Tense[] = []
  selectedImperativoTenses: Tense[] = []
  selectedGerundioTenses: Tense[] = []

  allSelectedTenses: Tense[] = []

  wordCounter = 0

  roundCounter = 0
  attemptCounter = 1

  attemptStartAt = 0
  attemptEndAt = 0


  isAuthenticated = false

  constructor(private datePipe: DatePipe,private eventService: EventService,private tokenStorageService: TokenStorageService, private authService: AuthService,private conjugationService: ConjugationService){}

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

  startRound(){
    this.roundCounter++
    this.attemptCounter = 1
    this.attemptStartAt = (new Date).getTime();
    this.allSelectedTenses = []
    this.allSelectedTenses.push(...this.selectedIndicativoTenses)
    this.allSelectedTenses.push(...this.selectedCondizionaleTenses)
    this.allSelectedTenses.push(...this.selectedCongiuntivoTenses)
    this.allSelectedTenses.push(...this.selectedImperativoTenses)
    this.allSelectedTenses.push(...this.selectedGerundioTenses)


    this.isGameComponentVisible=true
    this.resetInputFields()
    this.loadNextWord()
  }

  checkAnswers(){
    
    this.isCheckAnswersClicked = true 

    for (var mood of Object.keys(this.answers)) {
      if( (mood =="indicativo" && this.selectedIndicativoTenses.length == 0) || 
          (mood =="condizionale" && this.selectedCondizionaleTenses.length == 0) ||
          (mood =="congiuntivo" && this.selectedCongiuntivoTenses.length == 0) || 
          (mood =="imperativo" && this.selectedImperativoTenses.length == 0) || 
          (mood =="gerundio" && this.selectedGerundioTenses.length == 0)){
          continue
      }
      for(var pronomi of this.pronomiSoggetto){    
        for (var mood of Object.keys(this.answers)) {
          for(var tense of Object.keys(this.answers[mood]) ){
            console.log(this.answers[mood][tense][pronomi]["answer"] + " vs " + this.selectedVerb["conjugations"][mood][tense][pronomi])
            this.answers[mood][tense][pronomi]["isCorrect"] = (this.answers[mood][tense][pronomi]["answer"] === this.selectedVerb["conjugations"][mood][tense][pronomi])
          }
        }
      }
    }
    
    this.attemptEndAt = (new Date).getTime();
  }

  loadNextWord(){
    
    this.selectedVerb["verb"] = this.verbs[this.wordCounter++]
    
    this.conjugationService.getConjugation(this.selectedVerb.verb.italian).subscribe(
      data=>{
        this.selectedVerb["conjugations"] = data.result
        this.addDifficultyBasedHints()
      },
      err => {
        console.log(err)
      }
    )

  }

  finishGame(){

    this.resetInputFields()
    this.isGameComponentVisible = false
    this.selectedVerb = {}

  }

  resetInputFields(){
    this.isCheckAnswersClicked = false
    for(var pronomi of this.pronomiSoggetto){    
      for (var mood of Object.keys(this.answers)) {
        for(var tense of Object.keys(this.answers[mood]) ){
          this.answers[mood][tense][pronomi] =  {"answer":"",isCorrect:false}
        }
      }
    }
  }

  addDifficultyBasedHints(){
    for (var mood of Object.keys(this.answers)) {
      for (var tense of Object.keys(this.answers[mood])) {
        var pronomiSoggettoCopy = ["io","tu","lui","noi","voi","loro"]
        for (var i = 0 ; i< this.selectedDifficulty.hintCount ; i++){
            var pronomi = pronomiSoggettoCopy[Math.floor(Math.random() * pronomiSoggettoCopy.length)]
            this.answers[mood][tense][pronomi]["answer"]  =  this.selectedVerb["conjugations"][mood][tense][pronomi]
            this.answers[mood][tense][pronomi]["isCorrect"] = true
            pronomiSoggettoCopy = pronomiSoggettoCopy.filter(p => (p != pronomi))
        }
      }
    }

    if (this.selectedDifficulty.hintCount == 6){
      this.checkAnswers()
    }
  }

  showAnswers(){
    for(var pronomi of this.pronomiSoggetto){    
      for (var mood of Object.keys(this.answers)) {
        for(var tense of Object.keys(this.answers[mood]) ){
          this.answers[tense][pronomi]["isCorrect"] = true
          this.answers[mood][tense][pronomi]["answer"] = this.selectedVerb["conjugations"][mood][tense][pronomi]
        }
      }
    }
  }

  sendCheckAnswersEvent(){
    var eventJSON : any = {}

    eventJSON["eventName"] = EnumEventName.CHECK_ANSWERS
    eventJSON["userID"] = parseInt(this.tokenStorageService.getItem(EnumSessionStorageKeys.USER_ID)) 
    eventJSON["sessionID"] = this.tokenStorageService.getItem(EnumSessionStorageKeys.SESSION_ID)
    eventJSON["gameType"] = EnumGameType.CONJUGATION
    eventJSON["attemptCount"] = this.attemptCounter
    eventJSON["correctAnswerCount"] = this.countCorrectAnswers()
    eventJSON["totalAnswerCount"] = this.countTotalAnswers()
    eventJSON["successRate"] = this.countCorrectAnswers() / this.countTotalAnswers()
    eventJSON["eventDateStr"] = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    eventJSON["startAt"] = this.attemptStartAt
    eventJSON["endAt"] = this.attemptEndAt
    eventJSON["paramsJSON"] =JSON.stringify({
      "allSelectedTenses": this.allSelectedTenses,
      "isCheckAnswersClicked":this.isCheckAnswersClicked,
      "selectedWord":JSON.stringify(this.selectedVerb)
    }) 

    this.eventService.sendEvent(eventJSON).subscribe()


    if(this.countCorrectAnswers() != this.countTotalAnswers()){
      this.attemptStartAt = (new Date).getTime();
      this.attemptCounter++
    } 
    
  }

  countCorrectAnswers():number{
    var correctAnswersCount = 0

    return correctAnswersCount
  }

  countTotalAnswers():number{
    var selectedFieldsCount = 0
    
    return selectedFieldsCount
  }

  sendShowAnswersEvent(){

  }

}
