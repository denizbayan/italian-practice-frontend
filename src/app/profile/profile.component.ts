import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

    constructor(){}

    ngOnInit() {
    }
}
