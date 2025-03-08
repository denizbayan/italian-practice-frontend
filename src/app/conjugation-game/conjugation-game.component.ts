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
import { VerbConjugationDTO } from '../_structs/dto/verb_conjugation_dto';
  
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

  subjectPronouns = ["io","tu","lui","noi","voi","loro"]

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

  answers : any = {}

  IndicativoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Indicativo Presente",code: "indicativo_presente",mood:"Indicativo",tense:"Presente"},
    {optionLabel: "Passato Prossimo", answersLabel : "Indicativo Passato Prossimo",code: "indicativo_passatoProssimo",mood:"Indicativo",tense:"PassatoProssimo"},
    {optionLabel: "Imperfetto", answersLabel : "Indicativo Imperfetto",code: "indicativo_imperfetto",mood:"Indicativo",tense:"Imperfetto"},
    {optionLabel: "Futuro Semplice", answersLabel : "Indicativo Futuro Semplice",code: "indicativo_futuroSemplice",mood:"Indicativo",tense:"FuturoSemplice"}
  ];
  CondizionaleTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Condizionale Presente",code: "condizionale_presente",mood:"Condizionale",tense:"Presente"},
    {optionLabel: "Passato", answersLabel : "Condizionale Passato",code: "condizionale_passato",mood:"Condizionale",tense:"Passato"}
  ];
  CongiuntivoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Congiuntivo Presente",code: "congiuntivo_presente",mood:"Congiuntivo",tense:"Presente"},
    {optionLabel: "Passato", answersLabel : "Congiuntivo Passato",code: "congiuntivo_passato",mood:"Congiuntivo",tense:"Passato"},
    {optionLabel: "Imperfetto", answersLabel : "Congiuntivo Imperfetto",code: "congiuntivo_imperfetto",mood:"Congiuntivo",tense:"Imperfetto"}
  ];
  ImperativoTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Imperativo Presente",code: "imperativo_presente",mood:"Imperativo",tense:"Presente"},
  ];
  GerundioTenses: Tense[] =[
    {optionLabel: "Presente", answersLabel : "Gerundio Presente",code: "gerundio_presente",mood:"Gerundio",tense:"Presente"},
    {optionLabel: "Passato", answersLabel : "Gerundio Passato",code: "gerundio_passato",mood:"Gerundio",tense:"Passato"}
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

  verbConjugations : VerbConjugationDTO[] =[];

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

    this.allSelectedTenses.forEach(tenseInfo => {
      for(var pronoun of this.subjectPronouns){
        var mood = tenseInfo.mood
        var tense = tenseInfo.tense
        this.answers[mood][tense][pronoun]["isCorrect"] = 
            (this.answers[mood][tense][pronoun]["answer"] === this.selectedVerb["conjugations"][mood][tense][pronoun])
      }    
    })
    
    this.attemptEndAt = (new Date).getTime();
  }

  loadNextWord(){
    
    this.selectedVerb["verb"] = this.verbs[this.wordCounter++]
    
    this.conjugationService.getConjugation(this.selectedVerb.verb.italian).subscribe(
      data=>{
        this.verbConjugations = data
        let conjugationJSON:any = {}
        this.verbConjugations.forEach(verbConjugation =>{
          if(!conjugationJSON[verbConjugation.mood]){
            conjugationJSON[verbConjugation.mood] = {}
          }
          if(!conjugationJSON[verbConjugation.mood][verbConjugation.tense]){
            conjugationJSON[verbConjugation.mood][verbConjugation.tense] = {}
          }
          Object.keys(verbConjugation.conjugationDict).forEach(pronoun =>{
            conjugationJSON[verbConjugation.mood][verbConjugation.tense][pronoun] = verbConjugation.conjugationDict[pronoun]
          })

        })
        
        this.selectedVerb["conjugations"] = conjugationJSON

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

    this.allSelectedTenses.forEach(tense => {
      
      if(!this.answers[tense.mood]){
        this.answers[tense.mood] = {}
      }
      if(!this.answers[tense.mood][tense.tense]){
        this.answers[tense.mood][tense.tense] = {}
      }
      for(var pronoun of this.subjectPronouns){
        this.answers[tense.mood][tense.tense][pronoun] =  {"answer":"",isCorrect:false, isHint: false}
      }
    })
    
  }

  addDifficultyBasedHints(){

    this.allSelectedTenses.forEach(selectedTense => {
      var subjectPronounCopy = ["io","tu","lui","noi","voi","loro"]
      for (var i = 0 ; i< this.selectedDifficulty.hintCount ; i++){
          var pronoun = subjectPronounCopy[Math.floor(Math.random() * subjectPronounCopy.length)]
          var mood = selectedTense.mood
          var tense = selectedTense.tense
          this.answers[mood][tense][pronoun]["answer"]  =  this.selectedVerb["conjugations"][mood][tense][pronoun]
          this.answers[mood][tense][pronoun]["isCorrect"] = true
          this.answers[mood][tense][pronoun]["isHint"] = true
          subjectPronounCopy = subjectPronounCopy.filter(p => (p != pronoun))
      }
    })

    if (this.selectedDifficulty.hintCount == 6){
      this.checkAnswers()
    }
  }

  showAnswers(){
    this.allSelectedTenses.forEach(tenseInfo => {
      for(var pronoun of this.subjectPronouns){
        var mood = tenseInfo.mood
        var tense = tenseInfo.tense
        this.answers[mood][tense][pronoun]["isCorrect"] = true
        this.answers[mood][tense][pronoun]["answer"] = this.selectedVerb["conjugations"][mood][tense][pronoun]
      }    
    })
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

    this.allSelectedTenses.forEach(tenseInfo => {
      for(var pronoun of this.subjectPronouns){
        var mood = tenseInfo.mood
        var tense = tenseInfo.tense
        if(this.answers[mood][tense][pronoun]["isCorrect"] && !this.answers[mood][tense][pronoun]["isHint"]){
          correctAnswersCount++
        }
      }    
    })
    
    return correctAnswersCount
  }

  countTotalAnswers():number{
    return (this.subjectPronouns.length - this.selectedDifficulty.hintCount)* this.allSelectedTenses.length
  }

  sendShowAnswersEvent(){

  }

}
