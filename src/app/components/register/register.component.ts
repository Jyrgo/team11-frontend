import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  title: string = "Register";
  submitted = false;
  loading = false;

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    //Would be nice to implement later
    //email: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    //repeatPassword: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private userService: UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  };

  //@Todo implement register method
  register($event: any) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

}
