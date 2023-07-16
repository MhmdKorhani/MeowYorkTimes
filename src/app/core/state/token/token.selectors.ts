import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TokenState } from "./token.state";

const selectTokenState = createFeatureSelector<TokenState>('token');

export const selectToken = createSelector(selectTokenState, (state) => {
    return state.token;
});