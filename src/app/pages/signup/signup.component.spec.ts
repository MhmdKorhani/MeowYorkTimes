import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '@core/auth';
import { ApiService } from '@core/providers/api.service';
import { CommonService } from '@core/providers/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from '@core/state/token';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { User } from '@shared/models';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let authService: AuthService;
    let router: Router;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                StoreModule.forRoot({ token: tokenReducer }),
                MatFormFieldModule,
                MatButtonModule,
                MatInputModule
            ],
            providers: [
                AuthService,
                ApiService,
                CommonService,
                MatSnackBar,
                MatFormFieldControl]
        });
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
        formBuilder = TestBed.inject(FormBuilder);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with null values', () => {
        expect(component.signUpForm.value).toEqual({ email: null, password: null, confirmPassword: null });
    });

    /**
     * Test case to validate the email format.
     * It sets the value of the email control to an invalid email format and expects the control to be invalid.
     * Then, it sets the value of the email control to a valid email format and expects the control to be valid.
     * @returns None
     */
    it('should validate email format', () => {
        const emailControl = component.signUpForm.get('email');
        emailControl?.setValue('invalid-email');
        expect(emailControl?.valid).toBeFalsy();
        emailControl?.setValue('valid-email@example.com');
        expect(emailControl?.valid).toBeTruthy();
    });

    /**
     * Validates the required fields of the sign-up form.
     * - Checks if the email field is empty and sets it as invalid.
     * - Checks if the password field is empty and sets it as invalid.
     * - Checks if the confirm password field is empty and sets it as invalid.
     * - Expects the email field to be valid.
     * - Expects the password field to be valid.
     * - Expects the sign-up form to be valid.
     * @returns None
     */
    it('should validate required fields', () => {
        const emailControl = component.signUpForm.get('email');
        const passwordControl = component.signUpForm.get('password');
        const confirmPasswordControl = component.signUpForm.get('confirmPassword');
        emailControl?.setValue('');
        passwordControl?.setValue('');
        expect(emailControl?.valid).toBeFalsy();
        expect(passwordControl?.valid).toBeFalsy();
        expect(component.signUpForm.valid).toBeFalsy();

        emailControl?.setValue('example@example.com');
        passwordControl?.setValue('Test@123');
        confirmPasswordControl?.setValue('Test@123');
        expect(emailControl?.valid).toBeTruthy();
        expect(passwordControl?.valid).toBeTruthy();
        expect(component.signUpForm.valid).toBeTruthy();
    });


    /**
     * Test case to validate password match in a sign up form.
     * It sets the values of email, password, and confirmPassword controls in the form.
     * Then it checks if the form is valid or not based on the password match.
     * @returns None
     */
    it('should validate password match', () => {
        const emailControl = component.signUpForm.get('email');
        const passwordControl = component.signUpForm.get('password');
        const confirmPasswordControl = component.signUpForm.get('confirmPassword');

        emailControl?.setValue('test@test.com');
        passwordControl?.setValue('#password');
        confirmPasswordControl?.setValue('#password123');
        expect(component.signUpForm.valid).toBeFalsy();

        confirmPasswordControl?.setValue('#password');
        expect(component.signUpForm.valid).toBeTruthy();
    });

    it('should navigate to homepage if signUp is successful', async () => {
        const mockToken = 'mockToken';
        spyOn(authService, 'register').and.returnValue(new Promise((resolve) => resolve(mockToken)));
        const formValue = {
            email: 'test@example.com',
            password: 'password'
        };
        component.signUpForm = formBuilder.group(formValue);

        await component.signUp();

        expect(authService.register).toHaveBeenCalledWith(formValue as User);
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should reset form and enable it if signUp is unsuccessful', async () => {
        spyOn(authService, 'register').and.returnValue(new Promise((resolve) => resolve(null)));
        const formValue = {
            email: 'test@example.com',
            password: 'password'
        };
        component.signUpForm = formBuilder.group(formValue);

        await component.signUp();

        expect(authService.register).toHaveBeenCalledWith(formValue as User);
        expect(component.signUpForm.enabled).toBeTrue();
        expect(component.signUpForm.pristine).toBeTrue();
    });
});