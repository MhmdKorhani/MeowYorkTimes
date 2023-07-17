import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from '@core/auth';
import { ApiService } from '@core/providers/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonService } from '@core/providers/common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { tokenReducer } from '@core/state/token';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
      MatSnackBarModule,
      StoreModule.forRoot({ token: tokenReducer })],
    declarations: [AppComponent],
    providers: [AuthService, ApiService, CommonService, MatSnackBar]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
