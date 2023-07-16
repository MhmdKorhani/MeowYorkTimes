import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ApiService } from 'src/app/core/providers/api.service';
import { NewsCategories } from 'src/app/shared/constants/news-categories';
import { NewsCategory } from 'src/app/shared/models/news-category.model';
import { StoryResponse } from '@shared/models/response/story.response.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StoryComponent } from '../shared/story/story.component';
import { Story } from '@shared/models/story.model';
import { Endpoints } from '@shared/enums';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {

  loading = false;

  category!: string;
  categories: NewsCategory[] = NewsCategories;
  stories!: Story[];

  constructor(
    private api: ApiService,
    private dialog: MatDialog) {
  }

  /**
   * Handles the event when the category is changed.
   * @param {MatButtonToggleChange} event - The event object containing the new value of the category.
   * @returns None
   */
  categoryChanged(event: MatButtonToggleChange) {
    this.category = event.value;
    this.getStories(event.value);
  }

  /**
   * Retrieves stories from the API based on the given category.
   * @param {string} category - The category of stories to retrieve.
   * @returns None
   */
  async getStories(category: string) {
    this.loading = true;

    const url = `${environment.newYorkTimes.ApiURL}/${Endpoints.stories}/${category}.json`;
    const results = await firstValueFrom(this.api.get<StoryResponse>(url));
    this.loading = false;
    this.stories = results.results.filter(x => x.multimedia != null && x.multimedia[0].caption !== '');
  }

  /**
   * Opens a dialog to display the details of a story.
   * @param {Story} story - The story object to display details for.
   * @returns None
   */
  async seeDetails(story: Story) {
    this.dialog.open(StoryComponent, {
      data: story,
      minWidth: '70vw'
    });
  }
}
