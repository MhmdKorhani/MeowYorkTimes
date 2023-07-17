import { TestBed } from '@angular/core/testing';

import { ApiInterceptor } from './api.interceptor';
import { HttpEvent, HttpHandler, HttpParams, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

describe('ApiInterceptor', () => {

  let interceptor: ApiInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiInterceptor
      ]
    });

    interceptor = TestBed.inject(ApiInterceptor);

  });

  it('should be created', () => {
    const interceptor: ApiInterceptor = TestBed.inject(ApiInterceptor);
    expect(interceptor).toBeTruthy();
  });

  /**
   * Test case for adding an API key to the request parameters if the URL includes the New York Times API URL.
   * @returns None
   */
  it('should add API key to params if URL includes New York Time API URL', () => {
    const request = new HttpRequest('GET', `${environment.newYorkTimes.ApiURL}/articles`, { params: new HttpParams() });
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        expect(req.params.has('api-key')).toBe(true);
        expect(req.params.get('api-key')).toBe(environment.newYorkTimes.apiKey);
        return new Observable<HttpEvent<unknown>>();
      }
    };

    interceptor.intercept(request, next);
  });

  /**
   * Test case to verify that the API key is not added to the request parameters if the URL does not include the New York Times API URL.
   * @returns None
   */
  it('should not add API key to params if URL does not include New York Time API URL', () => {
    const request = new HttpRequest('GET', 'https://example.com/api/articles', { params: new HttpParams() });
    const next: HttpHandler = {
      handle: (req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> => {
        expect(req.params.has('api-key')).toBe(false);
        return new Observable<HttpEvent<unknown>>();
      }
    };

    interceptor.intercept(request, next);
  });
});
