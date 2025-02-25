import { Component,  OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { EnumSessionStorageKeys } from '../_structs/enums/enum.session_storage_keys';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  form: any = {};
  errorMessage = ""
  
  constructor(private tokenStorageService: TokenStorageService, private router: Router, private authService :AuthService, private route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

  onSubmit(){

    this.authService.signin(this.form).subscribe(
      data => {
        console.log(data)
        this.tokenStorageService.saveItem(EnumSessionStorageKeys.TOKEN,data.jwt)
        this.tokenStorageService.saveItem(EnumSessionStorageKeys.USER,JSON.stringify(data))
        this.tokenStorageService.saveItem(EnumSessionStorageKeys.USERNAME,data.username)
        this.tokenStorageService.saveItem(EnumSessionStorageKeys.SESSION_ID,data.sessionID)
        this.tokenStorageService.saveItem(EnumSessionStorageKeys.USER_ID,data.userID)

        this.router.navigate([''], { relativeTo: this.route });
              },
      err => {
        console.log(err)
      }
    )

  }
}
