import { Injectable } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { environment } from 'src/environments/environment';
import { Subscription, firstValueFrom, interval } from 'rxjs';
import { Store } from '@ngrx/store';
import { setAccessToken } from '@core/state/token';
import { AccessToken } from '@shared/models/response';
import { User } from '@shared/models';
import { Endpoints, StorageKey } from '@shared/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authURL;
  private tokenRefreshSubscription!: Subscription;
  private regenerationTriggered = false;

  // P.S!!!
  // These two properties do not exist in a live scenario
  // They exist to implement regenerate token function which is the login function
  private email!: string;
  private password!: string;

  constructor(
    private api: ApiService,
    private store: Store) { }

  /**
   * Registers a new user by sending a POST request to the registration endpoint.
   * @param {User} user - The user object containing registration details.
   * @returns {Promise<string | null>} - A promise that resolves to the access token if registration is successful, or null otherwise.
   */
  async register(user: User): Promise<string | null> {
    const token = await firstValueFrom(this.api.post<AccessToken>(`${this.authUrl}/${Endpoints.register}`, user));
    if (token) {
      this.setLoggedInUser(token.access_token as string);
      this.setEmailandPassword(user);
    }
    return token?.access_token;
  }

  /**
   * Sign in the user with the provided credentials and return a token if successful.
   * @param {User} user - The user object containing the login credentials.
   * @returns {Promise<string | null>} A promise that resolves to a token if the login is successful, otherwise null.
   */
  async signIn(user: User): Promise<string | null> {
    const token = await firstValueFrom(this.api.post<AccessToken>(`${this.authUrl}/${Endpoints.login}`, user));
    if (token) {
      this.setLoggedInUser(token.access_token as string);
      this.setEmailandPassword(user);
    }
    return token?.access_token;
  }

  /**
   * Signs out the user by removing the access token from the session storage and updating the store.
   * @returns None
   */
  signOut() {
    sessionStorage.removeItem(StorageKey.token);
    this.store.dispatch(setAccessToken({ token: null }));
    this.tokenRefreshSubscription.unsubscribe();
  }

  /**
   * Sets the logged-in user's access token and saves it to the session storage.
   * Triggers token regenartion every 15 minutes (Code to be uncommented).
   * @param {string} token - The access token of the logged-in user.
   * @param {boolean} [saveSession=true] - Whether to save the token to the session storage.
   * @returns None
   */
  private setLoggedInUser(token: string, saveSession = true) {
    this.store.dispatch(setAccessToken({ token: token }));
    if (saveSession) {
      sessionStorage.setItem(StorageKey.token, token);
    }

    //Uncomment this feature to activate 15 minutes token regeneration
    //if (!this.regenerationTriggered) {
    //  this.startTokenRefreshTimer();
    //  this.regenerationTriggered = true;
    //}
  }

  /**
   * Starts a timer to refresh the token at a fixed interval of 900000 milliseconds (15 minutes).
   * @returns None
   */
  private async startTokenRefreshTimer() {
    this.tokenRefreshSubscription = interval(900000).subscribe(async () => {
      await this.signIn({ email: this.email, password: this.password } as User);
    });
  }

  private setEmailandPassword(user: User) {
    this.email = user.email;
    this.password = user.password;
  }
}