import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { DefaultFormModule } from '@core/modules/default-form.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StoreModule } from '@ngrx/store';
import { historyReducer } from '@core/state/history';
import { EffectsModule } from '@ngrx/effects';
import { HistoryEffects } from '@core/state/history/history.effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostComponent } from '../shared/post/post.component';
import { DefaultMaterialModule } from '@core/modules/default-material.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    DefaultFormModule,
    MatAutocompleteModule,
    StoreModule.forFeature('history', historyReducer),
    EffectsModule.forFeature([HistoryEffects]),
    MatPaginatorModule,
    PostComponent,
    DefaultMaterialModule,
    MatDialogModule
  ]
})
export class ArticlesModule { }
