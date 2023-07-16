import { createReducer, on } from '@ngrx/store';
import { setAccessToken } from './token.actions';
import { TokenState } from './token.state';
import { StorageKey } from 'src/app/shared/enums/storage-key.enum';

const initialState: TokenState = {
    token: sessionStorage.getItem(StorageKey.token)
};

export const tokenReducer = createReducer(
    initialState,
    on(setAccessToken, (state, { token }): TokenState => {
        return {
            ...state,
            token: token
        };
    })
);