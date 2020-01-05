import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {Subject} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AddGameService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  newGameSubject = new Subject();
  url: string = '/api/game/addGame';

  addGameToDatabase(game: string): void {
    this.httpClient.post(this.url, game, httpOptions)
      .subscribe(
      (val) => {
        this.newGameSubject.next(val);
        console.log("POST call successful value returned in body",
          val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
    this.router.navigate(['']);
  }

  getNewGameObserbable() {
    return this.newGameSubject.asObservable()
  }

}
