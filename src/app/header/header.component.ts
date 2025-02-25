import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TokenStorageService } from '../_services/token-storage.service';
import { EnumSessionStorageKeys } from '../_structs/enums/enum.session_storage_keys';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input() tokenValidationStatus$: Observable<boolean|null>  = of(false)

  headers: MenuItem[] =[];

  highest_role = null  

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenValidationStatus$) {
      this.tokenValidationStatus$.subscribe((isValid) => {
        this.headers =[
          {
            label: 'Italian Practice Games',
            styleClass:"p-menubar-start",
            command : () => {window.location.href="/"}
          }
        ];
        if (isValid) {
          this.fillHeadersAuthorized();
        } else {
          this.fillHeadersUnauthorized();
        }
      });
    }
  }

  fillHeadersAuthorized(){
    var username = this.tokenStorageService.getItem(EnumSessionStorageKeys.USERNAME)
    this.headers.push(
      {
        
        label: username,
        icon: 'pi pi-fw pi-user',
        styleClass:"p-menubar-end",
        items: [
            {
              label: 'Play History',
              icon: 'pi pi-fw pi-replay',
              styleClass:"p-menubar-start",
              command : () => {window.location.href="/history"}
            },
            {
              label: 'Settings',
              icon: 'pi pi-fw pi-cog',
              styleClass:"p-menubar-start",
              command : () => {window.location.href="/profile"}
            },
            {
                separator: true
            },
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-power-off',
              styleClass:"p-menubar-start",
              command : () => this.logout()
            }
        ]
      }
    )
  }

  fillHeadersUnauthorized(){
    this.headers.push(
      {
        label: 'To Start Playing, You Must Sign In',
        icon:"pi pi-arrow-right",
        styleClass:"p-menubar-end",
        style:{'font-size':'4vh'},
      }, 
      {
        label: 'Sign in',
        icon: 'pi pi-fw pi-users',
        styleClass:"p-menubar-end",
        command : () => {
          window.location.href = "/signin";
        }
      }
    )
  }

  logout(){
    this.tokenStorageService.clearStorage();
    window.location.href = "/"
  }
  
}
