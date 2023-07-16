import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { StoryComponent } from '../shared/story/story.component';
import { DefaultMaterialModule } from '@core/modules/default-material.module';

@NgModule({
  declarations: [
    StoriesComponent
  ],
  imports: [
    CommonModule,
    DefaultMaterialModule,
    StoriesRoutingModule,
    MatButtonToggleModule,
    MatDialogModule,
    StoryComponent
  ]
})
export class StoriesModule { }
