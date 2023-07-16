import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const existingParams = request.params;
    let params = new HttpParams();

    existingParams.keys().forEach(key => {
      params = params.set(key, existingParams.get(key) as string);
    });

    if (request.url.includes(environment.newYorkTimes.ApiURL)) {
      params = params.set('api-key', environment.newYorkTimes.apiKey);
    }

    // You can add Authorization Bearer Token here
    // NY Times API Responds with 0 Unkown Error
    const newRequest = request.clone({ params: params });
    return next.handle(newRequest);
  }
}