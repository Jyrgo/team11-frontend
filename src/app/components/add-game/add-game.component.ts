import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AddGameService } from "../../services/add-game.service";

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.sass']
})

export class AddGameComponent implements OnInit {

  title: string = "Add Game";

  constructor(private addGameService: AddGameService) { }

  ngOnInit() {

  }

  addGame($event: MouseEvent) {
    this.addGameService.addGameToDatabase(this.gameForm.value);
  }

  gameForm = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
    title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    tag: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.gameForm.controls[controlName].hasError(errorName);
  }

}
