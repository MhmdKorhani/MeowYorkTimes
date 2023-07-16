import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { User } from '@shared/models';
import { matchPassword } from '@shared/validators/match-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the sign up form with the necessary form controls and validators.
   * @returns None
   */
  private initForm() {
    this.signUpForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: [null, Validators.required]
    }, {
      validators: matchPassword
    });
  }

  /**
   * Handles the sign up process for a user.
   * Disables the sign up form, retrieves the user's email and password from the form,
   * and calls the `register` method of the `auth` service to register the user.
   * If the registration is successful and a token is returned, navigates to the home page.
   * @returns None
   */
  async signUp() {
    this.signUpForm.disable();
    const user = {} as User;
    user.email = this.signUpForm.get('email')?.value;
    user.password = this.signUpForm.get('password')?.value;

    const token = await this.auth.register(user);

    if (token) {
      this.router.navigate(['']);
    }
    else {
      this.signUpForm.enable();
      this.signUpForm?.reset();
    }
  }
}