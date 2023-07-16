import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { ApiService } from '@core/providers/api.service';
import { saveHistory, selectHistory } from '@core/state/history';
import { Store } from '@ngrx/store';
import { Endpoints } from '@shared/enums';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;

  searchControl = new FormControl<string>('');
  histories$!: Observable<string[]>;

  constructor(
    private store: Store,
    private api: ApiService) {

  }

  ngOnInit(): void {
    this.getHistories();
  }

  /**
   * Retrieves the histories from the store and assigns them to the 'histories$' property.
   * @returns None
   */
  getHistories() {
    this.histories$ = this.store.select(selectHistory);
  }


  /**
   * Handles the search event triggered by a keyboard event.
   * If the keyCode of the event is 13 (Enter key), it sets the value of the search control.
   * @param {KeyboardEvent} event - The keyboard event object.
   * @returns None
   */
  handleSearch(event: KeyboardEvent): void {
    if (event.keyCode === 13) {
      this.setValue(this.searchControl.value as string);
    }
  }

  /**
   * Handles the selection of an option from the autocomplete dropdown.
   * @param {MatAutocompleteSelectedEvent} event - The event object containing the selected option.
   * @returns None
   */
  autoCompleteSelected(event: MatAutocompleteSelectedEvent) {
    this.setValue(event.option.value);
  }

  /**
   * Sets the value of the search input field and performs a search.
   * @param {string} value - The value to set in the search input field.
   * @returns None
   */
  private setValue(value: string) {
    this.store.dispatch(saveHistory({ content: value }));
    this.searchControl.reset();
    this.autocomplete.closePanel();
    this.search(this.searchControl.value as string);
  }

  search(val: string) {
    const search: Map<string, string> = new Map<string, string>();
    search.set('q', val);
    search.set('page', '1');
    this.api.get(`${environment.newYorkTimes.ApiURL}/${Endpoints.articles}`, search).subscribe((data) => {
      console.log(data);
    })
  }
}