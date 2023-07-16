import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth';
import { User } from '@shared/models';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Initializes the login form with the necessary form controls and validators.
   * @returns None
   */
  private initForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  /**
   * Sign in the user using the provided email and password.
   * Disables the login form while signing in.
   * If the sign in is successful, navigates to the home page.
   * If the sign in fails, enables the login form and resets it.
   * @returns None
   */
  async signIn() {
    this.loginForm.disable();
    const user = {} as User;
    user.email = this.loginForm.get('email')?.value;
    user.password = this.loginForm.get('password')?.value;

    const token = await this.auth.signIn(user);

    if (token) {
      this.router.navigate(['']);
    }
    else {
      this.loginForm.enable();
      this.loginForm.reset();
    }
  }
}
