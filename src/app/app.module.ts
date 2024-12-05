import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HomeComponent } from './home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        MenubarModule,
        TabViewModule,
        CheckboxModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
  