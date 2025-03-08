import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ArticleGameComponent } from './article-game/article-game.component';
import { ConjugationGameComponent } from './conjugation-game/conjugation-game.component';
import { DictionaryGameComponent } from './dictionary-game/dictionary-game.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { ButtonModule } from 'primeng/button';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent } from './profile/profile.component';
import { DatePipe } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      ArticleGameComponent,
      ConjugationGameComponent,
      DictionaryGameComponent,
      SigninComponent,
      SignupComponent,
      HeaderComponent,
      HistoryComponent,
      ProfileComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        MenubarModule,
        FormsModule,
        TabViewModule,
        CheckboxModule,
        TableModule,
        HttpClientModule,
        DropdownModule,
        BrowserAnimationsModule,
        ButtonModule,
        DatePipe,
        ChartModule,
        DialogModule,
        MultiSelectModule,
        ScrollPanelModule,
        SelectButtonModule
        
    ],
    providers: [authInterceptorProviders,DatePipe],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  