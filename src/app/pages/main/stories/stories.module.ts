import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { StoriesComponent } from './stories.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultMaterialModule } from '@core/modules/default-material.module';
import { PostComponent } from '../shared/post/post.component';
import { PostDetailComponent } from '../shared/post-detail/post-detail.component';

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
    PostComponent,
    PostDetailComponent
  ]
})
export class StoriesModule { }