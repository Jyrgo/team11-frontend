import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../models/Game";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class GetGameByIdService {

  constructor(private httpClient: HttpClient) { }

  getGameById(id: number): Observable<Game> {
    return this.httpClient.get<Game>('api/game/' + id);
  }

  getCurrentUserID(): Observable<User> {
    return this.httpClient.get<User>('api/users/me');
  }

  checkAuthor(id: number): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/game/' + id, "");
  }

  updateGame(game: Game, id: number): Observable<Game> {
    return this.httpClient.put<Game>('/api/game/' + id, game);
  }
}
