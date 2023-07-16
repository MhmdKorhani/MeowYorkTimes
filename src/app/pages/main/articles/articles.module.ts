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

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    DefaultFormModule,
    MatAutocompleteModule,
    StoreModule.forFeature('history', historyReducer),
    EffectsModule.forFeature([HistoryEffects]),
  ]
})
export class ArticlesModule { }
