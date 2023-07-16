import { createAction, props } from '@ngrx/store';

export const setAccessToken = createAction('[Token] Set Access Token', props<{ token: string | null }>());