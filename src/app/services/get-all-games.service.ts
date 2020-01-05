import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GetAllGamesService {

  constructor(private httpClient: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>('/api/game' );
  }
}
