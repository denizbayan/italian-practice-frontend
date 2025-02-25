import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { WordService } from '../_services/word.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { EnumSessionStorageKeys } from '../_structs/enums/enum.session_storage_keys';
import { EventService } from '../_services/event.service';
import { EnumGameType } from '../_structs/enums/enum.game_type';
import { EnumEventName } from '../_structs/enums/enum.event_name';
import { AuthService } from '../_services/auth.service';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-game',
  templateUrl: './article-game.component.html',
  styleUrl: './article-game.component.css'
})
export class ArticleGameComponent implements OnInit {

  isAuthenticated = false

  words : any = [] 

  isSingularSelected = true
  isPluralSelected = false
  isdeterminativeSelected = true
  isIndeterminativeSelected = false

  singularOrPluralAnswer = ""
  determinativeArticleAnswer = ""
  indeterminativeArticleAnswer = ""

  isSingularOrPluralAnswerCorrect = false
  isDeterminativeArticleAnswerCorrect = false
  isIndeterminativeArticleAnswerCorrect = false

  isGameComponentVisible = false
  isCheckAnswersClicked = false

  isSelectedWordSingular = false

  selectedWord : any = {}

  roundCounter = 0
  attemptCounter = 1

  attemptStartAt = 0
  attemptEndAt = 0

  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService,private eventService: EventService,private wordService: WordService,private datePipe: DatePipe){}

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

  async startGame(){
    await this.fetchWordsAsync(true)
    console.log("finished")
    this.isGameComponentVisible=true
    this.loadNextRound()

  }

  async fetchWordsAsync(waitToFinish: boolean){
    if(waitToFinish){
      try {
        this.words = await firstValueFrom(this.wordService.getWord("A1"));
        console.log("fetched");
      } catch (err) {
        console.log(err);
      }
    }else{
      this.wordService.getWord("A1").subscribe(
        data=>{
          this.words.push(...data)
        },
        err => {
          console.log(err)
        }
      )
    }

  }

  loadNextRound(){
    this.roundCounter++
    if(this.roundCounter % 10 == 0 ){
      this.fetchWordsAsync(false)
    }

    this.clearInputFields()
    this.loadNextWord()
    this.attemptCounter = 1
    this.attemptStartAt = (new Date).getTime();
  }

  loadNextWord(){
    
    this.isCheckAnswersClicked = false
    this.selectedWord = this.words[this.roundCounter-1]
    if (this.isSingularSelected && this.isPluralSelected){
        this.isSelectedWordSingular = Math.random() > 0.5
    }else{
      this.isSelectedWordSingular = this.isSingularSelected
    }
  }
  
  clearInputFields(){
    this.singularOrPluralAnswer = ""
    this.determinativeArticleAnswer = ""
    this.indeterminativeArticleAnswer = ""
  }

  checkAnswers(){
    if(this.isSelectedWordSingular){
      this.isSingularOrPluralAnswerCorrect =  this.singularOrPluralAnswer.toLowerCase() == this.selectedWord.italianNamePlural.toLowerCase()
      this.isDeterminativeArticleAnswerCorrect = this.determinativeArticleAnswer.toLowerCase() == this.selectedWord.determinativeArticleSingular.toLowerCase()
      this.isIndeterminativeArticleAnswerCorrect = this.indeterminativeArticleAnswer.toLowerCase() == this.selectedWord.indeterminativeArticleSingular.toLowerCase()
    }else{
      this.isSingularOrPluralAnswerCorrect = this.singularOrPluralAnswer.toLowerCase() == this.selectedWord.italianNameSingular.toLowerCase()
      this.isDeterminativeArticleAnswerCorrect = this.determinativeArticleAnswer.toLowerCase() == this.selectedWord.determinativeArticlePlural.toLowerCase()
      this.isIndeterminativeArticleAnswerCorrect = this.indeterminativeArticleAnswer.toLowerCase() == this.selectedWord.indeterminativeArticlePlural.toLowerCase()
    }
    this.isCheckAnswersClicked = true 
    this.attemptEndAt = (new Date).getTime();
    
  }

  sendCheckAnswersEvent(){
    var eventJSON : any = {}

    eventJSON["eventName"] = EnumEventName.CHECK_ANSWERS
    eventJSON["userID"] = parseInt(this.tokenStorageService.getItem(EnumSessionStorageKeys.USER_ID)) 
    eventJSON["sessionID"] = this.tokenStorageService.getItem(EnumSessionStorageKeys.SESSION_ID)
    eventJSON["wordID"] = this.selectedWord.id
    eventJSON["gameType"] = EnumGameType.ARTICLE
    eventJSON["attemptCount"] = this.attemptCounter
    eventJSON["correctAnswerCount"] = this.countCorrectAnswers()
    eventJSON["totalAnswerCount"] = this.countTotalAnswers()
    eventJSON["successRate"] = this.countCorrectAnswers() / this.countTotalAnswers()
    eventJSON["eventDateStr"] = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    eventJSON["startAt"] = this.attemptStartAt
    eventJSON["endAt"] = this.attemptEndAt
    eventJSON["paramsJSON"] =JSON.stringify({
      "isSingularSelected":this.isSingularSelected,
      "isPluralSelected":this.isPluralSelected,
      "isdeterminativeSelected":this.isdeterminativeSelected,
      "isIndeterminativeSelected":this.isIndeterminativeSelected,
      "singularOrPluralAnswer":this.singularOrPluralAnswer,
      "determinativeArticleAnswer":this.determinativeArticleAnswer,
      "indeterminativeArticleAnswer":this.indeterminativeArticleAnswer,
      "isSingularOrPluralAnswerCorrect":this.isSingularOrPluralAnswerCorrect,
      "isDeterminativeArticleAnswerCorrect":this.isDeterminativeArticleAnswerCorrect,
      "isIndeterminativeArticleAnswerCorrect":this.isIndeterminativeArticleAnswerCorrect,
      "isSelectedWordSingular":this.isSelectedWordSingular,
      "isCheckAnswersClicked":this.isCheckAnswersClicked,
      "selectedWord":JSON.stringify(this.selectedWord)
    }) 

    this.eventService.sendEvent(eventJSON).subscribe()


    if(this.countCorrectAnswers() != this.countTotalAnswers()){
      this.attemptStartAt = (new Date).getTime();
      this.attemptCounter++
    } 
    
  }

  countCorrectAnswers():number{
    var correctAnswersCount = 0

    if(this.isSingularOrPluralAnswerCorrect) correctAnswersCount++
    if(this.isDeterminativeArticleAnswerCorrect)correctAnswersCount++
    if(this.isIndeterminativeArticleAnswerCorrect)correctAnswersCount++

    return correctAnswersCount
  }

  countTotalAnswers():number{
    var selectedFieldsCount = 0
    
    if(this.isSingularSelected && this.isPluralSelected)selectedFieldsCount++
    if(this.isdeterminativeSelected)selectedFieldsCount++
    if(this.isIndeterminativeSelected)selectedFieldsCount++

    return selectedFieldsCount
  }

  sendShowAnswersEvent(){

  }

  showAnswers(){
    if(this.isSelectedWordSingular){
      this.singularOrPluralAnswer = this.selectedWord.italianNamePlural.toLowerCase()
      this.determinativeArticleAnswer = this.selectedWord.determinativeArticleSingular.toLowerCase()
      this.indeterminativeArticleAnswer = this.selectedWord.indeterminativeArticleSingular.toLowerCase()
    }else{
      this.singularOrPluralAnswer = this.selectedWord.italianNameSingular.toLowerCase()
      this.determinativeArticleAnswer = this.selectedWord.determinativeArticlePlural.toLowerCase()
      this.indeterminativeArticleAnswer = this.selectedWord.indeterminativeArticlePlural.toLowerCase()
    }
  }

  finishGame(){

    this.clearInputFields()
    this.isGameComponentVisible = false
    this.selectedWord = {}

  }

}
