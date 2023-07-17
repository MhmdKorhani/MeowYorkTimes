import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Presents an error message inside a snackbar to the user, if provided.
   * @param {string | undefined} error - The error message to display.
   * @returns None
   */
  presentError(error: string | undefined) {
    if (error && error !== '') {
      this._snackBar.open(error, "❗")
    }
  }
}