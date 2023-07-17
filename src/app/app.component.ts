import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth';
import { selectToken } from '@core/state/token';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  token$!: Observable<string | null>;

  constructor(
    private auth: AuthService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.token$ = this.store.select(selectToken);
  }

  signOut() {
    this.auth.signOut();
  }
}
