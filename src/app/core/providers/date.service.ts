import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  
  /**
   * Formats a given date into a readable format.
   * @param {Date} date - The date to be formatted.
   * @returns {string} - The formatted date in the format "dddd DD MMM YYYY".
   */
  getReadableDate(date: Date) {
    return moment(date).format("dddd DD MMM YYYY");
  }

  /**
   * Formats the given date object into the system's date format.
   * @param {Date} date - The date object to format.
   * @returns {string} The formatted date string in the format "YYYY-MM-DD".
   */
  getSystemDateFormat(date: Date) {
    return moment(date).format("YYYY-MM-DD");
  }
}