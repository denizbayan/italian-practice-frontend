import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'italian-practice-frontend';

  constructor(private authService: AuthService,private router: Router){}
  
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(event  => {
      if (event instanceof NavigationStart) {
        this.authService.validateToken()
      } 
    });
  }

  get tokenValidation$() {
    return this.authService.tokenValidation$!;
  }


}
