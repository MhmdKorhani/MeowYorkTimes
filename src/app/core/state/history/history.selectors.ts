import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HistoryState } from "./history.state";

const selectHistoryState = createFeatureSelector<HistoryState>('history');

export const selectHistory = createSelector(selectHistoryState, (state) => {
    return state.histories;
});