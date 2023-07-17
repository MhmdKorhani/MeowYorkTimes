import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Endpoints } from '@shared/enums';
import { StoryResponse } from '@shared/models/response';

describe('ApiService', () => {

    let service: ApiService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule
            ],
            providers: [
                HttpClient,
                CommonService,
                MatSnackBar
            ]
        });
        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /**
     * Test case for the http.get method to ensure that it returns a response with the expected properties.
     * @returns None
     */
    it('should http.get return response with properties', () => {
        const baseURL = `${environment.newYorkTimes.ApiURL}/${Endpoints.stories}/science.json`;
        const fullRequest = `${baseURL}?api-key=${environment.newYorkTimes.apiKey}`;
        const data = { status: 'OK', results: [], num_results: 123 } as StoryResponse;

        service.get<StoryResponse>(fullRequest).subscribe((data) => {
            expect(data).toBeDefined();
        });

        const req = httpTestingController.expectOne(fullRequest);
        expect(req.request.method).toEqual('GET');
        req.flush(data);
        httpTestingController.verify();
    });
});