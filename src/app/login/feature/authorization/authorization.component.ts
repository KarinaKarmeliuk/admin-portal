import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AuthenticationErrorEnum } from 'src/app/login/feature/authorization/authentication-error.enum';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as CustomValidators from 'src/app/shared/validators';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  message : string;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private translateService : TranslateService,
    private titleService : Title
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  getAppTitle(): string {
    return this.titleService.getTitle();
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, CustomValidators.validateEmailWithExclude('root')]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.loading = false;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(this.returnUrl);
        window.location.reload();
      },
      error => {
        console.log(error.error.message);
        console.log(error.message);
        this.error = error.error.message;
        this.loading = false;
      });
  }

  get f() {
    return this.loginForm.controls;
  }

  get password() { return this.loginForm.get('password'); }

  get username() { return this.loginForm.get('username'); }

  getMessage(key : string) { this.translateService.get(key).subscribe(value => this.message = value); return this.message; }

  getLoginErrorMessage() {
    return this.username!.hasError('required') ? this.getMessage('page_login_error_requiredName') :
      this.username!.hasError('email') ? this.getMessage('page_login_error_email') : '';
  }

  getPasswordErrorMessage() {
    return this.password!.hasError('required') ? this.getMessage('page_login_error_requiredPass') :
      this.password!.hasError('minLength') ? this.getMessage('page_login_error_minLength') : '';
  }

  getServerErrorMessage() {
    console.log(this.error);
    if(this.error == AuthenticationErrorEnum.WRONG_EMAIL_OR_PASSWORD) {
      return this.getMessage('page_login_error_email_or_pass');
    }
    return this.getMessage('page_login_server_error');
  }
}
