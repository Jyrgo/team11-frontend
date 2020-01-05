import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertService} from "../../services/alert.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  title: string = "Login";
  signup: string = "Not registered yet? Sign up here.";

  loading = false;
  submitted = false;
  returnUrl: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  });

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login($event: any) {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          location.reload();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
