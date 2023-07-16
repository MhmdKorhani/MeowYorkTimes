import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private common: CommonService) { }


  /**
   * Sends an HTTP GET request to the specified URL with optional headers.
   * @param {string} url - The URL to send the GET request to.
   * @param {Map<string, string>} [headers] - Optional headers to include in the request.
   * @returns {Observable<T>} An observable that emits the response data of type T.
   */
  get<T>(url: string, headers?: Map<string, string>): Observable<T> {

    let httpParams = new HttpParams();

    if (headers && headers.size > 0) {
      for (const [key, value] of headers) {
        httpParams = httpParams.set(key, value);
      }
    }

    return this.http.get(url, { params: httpParams }).pipe(
      catchError(async (err: HttpErrorResponse) => this.handleHttpError(err)),
      map(x => { return x as T })
    );
  }

  /**
   * Sends a POST request to the specified URL with the given object as the request body.
   * @param {string} url - The URL to send the POST request to.
   * @param {unknown} obj - The object to include in the request body.
   * @returns {Observable<T>} An observable that emits the response data of type T.
   */
  post<T>(url: string, obj: unknown): Observable<T> {
    return this.http.post(url, obj).pipe(
      catchError(async (err: HttpErrorResponse) => this.handleHttpError(err)),
      map(x => { return x as T })
    );
  }

  /**
   * Handles an HTTP error response by presenting an error message to the user.
   * @param {HttpErrorResponse} error - The HTTP error response object.
   * @returns None
   */
  private handleHttpError(error: HttpErrorResponse) {
    this.common.presentError(error?.message);
  }
}