import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {GamesComponent} from "../components/games/games.component";
import {AddGameComponent} from "../components/add-game/add-game.component";
import { GameDetailComponent } from "../components/game-detail/game-detail.component";
import {LoginComponent} from "../components/login/login.component";
import {RegisterComponent} from "../components/register/register.component";
import {AuthGuard} from "../helpers/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games', component: GamesComponent },
  { path: 'addGame', component: AddGameComponent, canActivate: [AuthGuard] },
  { path: 'games/:id', component: GameDetailComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
