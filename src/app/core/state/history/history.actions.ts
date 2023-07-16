import { createAction, props } from '@ngrx/store';

export const saveHistory = createAction('[History] Save History', props<{ content: string }>());
export const saveHistorySuccess = createAction('[History] Save History Success', props<{ histories: string[] }>());
export const getHistory = createAction('[History] Get History');