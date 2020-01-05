import { Component, OnInit } from '@angular/core';
import { Game } from "../../models/Game";
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GetGameByIdService} from "../../services/get-game-by-id.service";
import {DeleteService} from "../../services/delete.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.sass']
})
export class GameDetailComponent implements OnInit {
  game: Game;
  id: number;
  price: number;
  title: string;
  description: string;
  tag: string;
  user: User;
  private admin = "ADMIN";
  userID: number;
  isAuthor: boolean;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private deleteService: DeleteService,
              private getGameByIdService: GetGameByIdService,
              private router: Router) {
    this.user = authenticationService.currentUserValue;
  }

  updateForm = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    tag: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  ngOnInit() {
    if (this.user) {
      this.id = this.route.snapshot.params.id;
      this.getGameByIdService.getGameById(this.id).subscribe(
        (value) => {
          this.game = value;
          this.price = this.game.price;
          this.title = this.game.title;
          this.description = this.game.description;
          this.tag = this.game.tag;

          this.getGameByIdService.getCurrentUserID().subscribe((value) => {
            this.userID = value.id;
            this.getGameByIdService.checkAuthor(this.game.id).subscribe((value) => {
              this.isAuthor = value;
            });
          });
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    } else {
      this.router.navigate([""]);
    }
  }

  deleteGame(selectedGame) {

    this.deleteService.removeGameFromDatabase(selectedGame.id).subscribe(
      (val) => {
        console.log("POST call successful value returned in body",
          val);
        delete this.game;
        this.router.navigate([""]);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  updateGame($event: MouseEvent) {
    this.game.price = this.updateForm.value.price;
    this.game.title = this.updateForm.value.title;
    this.game.description = this.updateForm.value.description;
    this.game.tag = this.updateForm.value.tag;
    console.table(this.game);
    this.getGameByIdService.updateGame(this.game, this.game.id).subscribe((val)=> {
      console.log("POST call successful value returned in body",
        val);
    },
    response => {
      console.log("PUT call in error", response);
    },
    () => {
      console.log("The PUT request is now completed.");
      this.router.navigate([""]);
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.updateForm.controls[controlName].hasError(errorName);
  };
}
