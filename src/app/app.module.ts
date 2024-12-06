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

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent,
      ArticleGameComponent,
      ConjugationGameComponent,
      DictionaryGameComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        MenubarModule,
        TabViewModule,
        FormsModule,
        CheckboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  