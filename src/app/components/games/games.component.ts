import { Component, OnInit } from '@angular/core';
import { GetAllGamesService } from "../../services/get-all-games.service";
import { Game } from "../../models/Game";
import { SortValues } from "../../models/SortValues";
import { SortService } from "../../services/sort.service";
import {AddGameService} from "../../services/add-game.service";
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.sass']
})


export class GamesComponent implements OnInit {

  sortValues: SortValues[] = [
    {value: 'alphabetically', viewValue: 'Alphabetically'},
    {value: 'price', viewValue: 'By price'}
  ];

  displayedColumns: string[] = ['Title', 'Description', 'Price'];
  dataSource = [];
  selectedGame: Game;
  title: string = "Welcome to the Team 11 Game Store!";
  user: User;


  constructor(private getAllGames: GetAllGamesService,
              private sortService: SortService,
              private addGameService: AddGameService,
              private authenticationService: AuthenticationService,
              private router: Router
              ) {
    this.user = authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.addGameService.getNewGameObserbable().subscribe( value => {
      this.dataSource.push(value)
    });
    this.refreshAllGames();
  }

  private refreshAllGames() {
    this.getAllGames.getAllGames().toPromise()
      .then(async (data) => {
        this.dataSource = data;
      });
  }

  onSelect(game: Game): void {
    if (this.user) {
      this.selectedGame = game;
      this.router.navigate(["/games/" + game.id]);
    }
  }

  onSort(value: string): void {
    this.sortService.getSortedGames(value).subscribe(
      (val) => {
        this.dataSource = val;
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

}
