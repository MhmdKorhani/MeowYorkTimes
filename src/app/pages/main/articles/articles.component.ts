import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '@core/providers/api.service';
import { saveHistory, selectHistory } from '@core/state/history';
import { Store } from '@ngrx/store';
import { Endpoints } from '@shared/enums';
import { Multimedia } from '@shared/models';
import { ArticleResponse } from '@shared/models/response/article-response.model';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  response!: ArticleResponse;

  searchControl = new FormControl<string>('');
  histories$!: Observable<string[]>;

  loading = false;
  searchString!: string;
  page = 0;

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
  private async setValue(value: string) {
    this.searchControl.disable();
    this.autocomplete.closePanel();
    this.store.dispatch(saveHistory({ content: value }));
    this.searchString = value;
    this.page = 0;
    await this.search();
    this.searchControl.reset();
    this.searchControl.enable();
  }

  /**
   * Handles a page event by updating the current page index and triggering a search.
   * @param {PageEvent} event - The page event object containing the page index and page size.
   * @returns None
   */
  handlePageEvent(event: PageEvent) {
    console.log(event.pageIndex);
    this.page = event.pageIndex;
    this.search();
  }

  /**
   * Performs a search using the specified search string and page number.
   * @returns None
   */
  async search() {
    this.loading = true;
    const search: Map<string, string> = new Map<string, string>();
    search.set('q', this.searchString);
    search.set('page', this.page.toString());

    const data = await firstValueFrom(this.api.get<ArticleResponse>(`${environment.newYorkTimes.ApiURL}/${Endpoints.articles}`, search));

    data.response.docs.forEach(doc => {
      if (doc.multimedia.length == 0) {
        doc.multimedia = [{ url: `${environment.dummyData.lorempicsum}/seed/${this.searchString}/200/300` } as Multimedia];
      }
      else {
        doc.multimedia.map(x => x.url = `https://nytimes.com/${x.url}`);
      }
    });

    this.response = data;
    this.loading = false;
  }
}