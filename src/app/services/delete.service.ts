import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private httpClient: HttpClient) { }

  removeGameFromDatabase(id: number): Observable<Object> {
    const url = `/api/game/${id}`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    console.log(url);
    return this.httpClient.delete(url, httpOptions);
  }
}
