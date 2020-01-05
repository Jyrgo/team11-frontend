import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SortService {


  constructor(private httpClient: HttpClient) { }

  url: string = '/api/game/';

  getSortedGames(sortParam: string): Observable<Game[]>{
    if (sortParam === 'alphabetically') {
      return this.getGamesByAlphabet();
    }
    return this.getGamesByPrice();
  }

  getGamesByAlphabet(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.url
      , { params: {
          sortedType: "desc",
          sortedBy:"title"
        }
    });
  }

  getGamesByPrice(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.url , {
      params: {
        sortedType: "asc",
        sortedBy:"price"
      }
    });
  }
}
