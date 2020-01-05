import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from "./components/header/header.component";
import { GamesComponent } from './components/games/games.component';
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { AddGameComponent } from './components/add-game/add-game.component';
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from "./helpers/error.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesComponent,
    AddGameComponent,
    GameDetailComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
