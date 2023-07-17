import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { ApiService } from '@core/providers/api.service';
import { CommonService } from '@core/providers/common.service';
import { AuthService } from '@core/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from '@core/state/token';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '@shared/models';

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;
    let authService: AuthService;
    let router: Router;
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                SigninComponent
            ],
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
                MatFormFieldControl
            ]
        });
        fixture = TestBed.createComponent(SigninComponent);
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
        expect(component.loginForm.value).toEqual({ email: null, password: null });
    });


    it('should disable button if form is invalid', () => {
        const emailControl = component.loginForm.get('email');
        const passwordControl = component.loginForm.get('password');

        emailControl?.setValue(null);
        passwordControl?.setValue(null);
        const button = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(component.loginForm.value).toEqual({ email: null, password: null });
        expect(button.disabled).toBeTrue();
    });


    it('should enable button if form is invalid', () => {
        const emailControl = component.loginForm.get('email');
        const passwordControl = component.loginForm.get('password');

        emailControl?.setValue('test@test.com');
        passwordControl?.setValue('password#123');
        expect(component.loginForm.valid).toBeTruthy();
    });


    it('should navigate to homepage if signIn is successful', async () => {
        const mockToken = 'mockToken';
        spyOn(authService, 'signIn').and.returnValue(new Promise((resolve) => { resolve(mockToken) }));
        const formValue = {
            email: 'test@example.com',
            password: 'password'
        };
        component.loginForm = formBuilder.group(formValue);

        await component.signIn();

        expect(authService.signIn).toHaveBeenCalledWith(formValue as User);
        expect(router.navigate).toHaveBeenCalledWith(['']);
    });


    it('should reset form and enable it if signIn is unsuccessful', async () => {
        spyOn(authService, 'signIn').and.returnValue(new Promise((resolve) => { resolve(null) }));
        const formValue = {
            email: 'test@example.com',
            password: 'password'
        };
        component.loginForm = formBuilder.group(formValue);

        await component.signIn();

        expect(authService.signIn).toHaveBeenCalledWith(formValue as User);
        expect(component.loginForm.enabled).toBeTrue();
        expect(component.loginForm.pristine).toBeTrue();
    });
});
