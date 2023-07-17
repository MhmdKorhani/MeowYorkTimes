import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '@core/providers/common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from '@core/state/token';
import { User } from '@shared/models';
import { AccessToken } from '@shared/models/response';
import { ApiService } from '@core/providers/api.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
    let service: AuthService;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule, MatSnackBarModule, StoreModule.forRoot({ token: tokenReducer }),
            ],
            providers: [
                HttpClient, CommonService, MatSnackBar
            ]
        });
        service = TestBed.inject(AuthService);
        apiService = TestBed.inject(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register a new user and return an access token', async () => {
        const user = { email: 'test@example.com', password: 'password' } as User;
        const token: AccessToken = { access_token: 'mockToken' };
        spyOn(apiService, 'post').and.returnValue(of(token));

        const result = await service.register(user);

        expect(apiService.post).toHaveBeenCalledWith(`${environment.authURL}/register`, user);
        expect(service['email']).toBe('test@example.com');
        expect(service['password']).toBe('password');
        expect(result).toBe('mockToken');
    });

    it('should sign in a user and return an access token', async () => {
        const user = { email: 'test@example.com', password: 'password' } as User;
        const token: AccessToken = { access_token: 'mockToken' };
        spyOn(apiService, 'post').and.returnValue(of(token));

        const result = await service.signIn(user);

        expect(apiService.post).toHaveBeenCalledWith(`${environment.authURL}/login`, user);
        expect(service['email']).toBe('test@example.com');
        expect(service['password']).toBe('password');
        expect(result).toBe('mockToken');
    });
});
