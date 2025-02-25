import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  form : any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage : string[] = [];
  numericRE : RegExp = /.*\d.*/;
  lowerCaseRE : RegExp = /.*[a-z].*/;
  upperCaseRE : RegExp = /.*[A-Z].*/;
  specialCharRE : RegExp = /.*\W.*/;
  whiteSpaceRE : RegExp = /.*\s.*/;

  constructor() { }

  maxDate : Date = new Date()

  ngOnInit(): void {
  }

  onSubmit():void{
    this.errorMessage = [];
    //white space test must be implemented independent from other conditions
    /*if(this.whiteSpaceRE.test(this.form.password)){
      whiteSpaceControl = true;
      this.errorMessage.push("Şifre boşluk içeremez");
    }
    else{
      if(!this.numericRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet sayı");
      }
      if(!this.lowerCaseRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet küçük karakter");
      }
      if(!this.upperCaseRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet büyük karakter");
      }
      if(!this.specialCharRE.test(this.form.password)){
        regexControl = true;
        this.errorMessage.push("- en az 1 adet özel karakter (@#/*& gibi)");
      }
    }*/
    /*
    if(regexControl ||whiteSpaceControl){
      if(regexControl){
        this.errorMessage.push("İçermelidir.");
      }
      this.isSignUpFailed=true;
      this.isSuccessful=false;
    }else{
        this.isSignUpFailed=true;
        this.isSuccessful=false;
      
    }
    */
    


  }


}
