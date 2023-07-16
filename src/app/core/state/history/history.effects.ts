import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { saveHistory, saveHistorySuccess } from "./history.actions";
import { map } from "rxjs";
import { selectHistory } from "./history.selectors";
import { StorageKey } from "@shared/enums";


@Injectable()
export class HistoryEffects {

    constructor(
        private actions$: Actions,
        private store: Store) { }

    /**
     * An effect that listens for the saveHistory action and updates the history in the local storage.
     * @returns An observable that emits the saveHistorySuccess action with the updated history.
     */
    saveHistory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(saveHistory),
            concatLatestFrom(() => this.store.select(selectHistory)),
            map(([action, data]) => {
                const arr = Object.assign([], data);
                const index = arr.findIndex(x => x == action.content);

                if (index >= 0) {
                    arr.splice(index, 1);
                }

                arr.unshift(action.content);

                if (arr.length > 5) {
                    arr.splice(-1);
                }

                localStorage.setItem(StorageKey.history, arr.toString());
                return saveHistorySuccess({ histories: arr });
            })
        );
    });
}