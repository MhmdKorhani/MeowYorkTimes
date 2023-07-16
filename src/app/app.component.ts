import { Component } from '@angular/core';
import { AuthService } from '@core/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private auth: AuthService) {

  }

  signOut() {
    this.auth.signOut();
  }
}
