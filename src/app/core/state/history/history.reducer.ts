import { createReducer, on } from '@ngrx/store';
import { StorageKey } from 'src/app/shared/enums/storage-key.enum';
import { HistoryState } from './history.state';
import { saveHistorySuccess } from './history.actions';

const initialState: HistoryState = {
    histories: localStorage.getItem(StorageKey.history) != null ? localStorage.getItem(StorageKey.history)?.split(',') as string[] : []
};

export const historyReducer = createReducer(
    initialState,
    on(saveHistorySuccess, (state, { histories }): HistoryState => {
        return { ...state, histories: histories };
    })
);