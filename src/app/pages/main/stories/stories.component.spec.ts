import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoriesComponent } from './stories.component';
import { ApiService } from '@core/providers/api.service';
import { CommonService } from '@core/providers/common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Story } from '@shared/models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostComponent } from '../shared/post/post.component';
import { NewsCategories } from '@shared/constants/news-categories';
import { PostDetailComponent } from '../shared/post-detail/post-detail.component';
import { StoryResponse } from '@shared/models/response';
import { environment } from 'src/environments/environment';
import { Endpoints } from '@shared/enums';
import { of } from 'rxjs';

describe('StoriesComponent', () => {

    let component: StoriesComponent;
    let fixture: ComponentFixture<StoriesComponent>;
    let matDialog: MatDialog;
    let apiService: ApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                StoriesComponent
            ],
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                MatDialogModule,
                MatButtonToggleModule,
                MatProgressSpinnerModule,
                PostComponent
            ],
            providers: [ApiService, CommonService, MatSnackBar, MatDialog]
        });
        fixture = TestBed.createComponent(StoriesComponent);
        component = fixture.componentInstance;
        matDialog = TestBed.inject(MatDialog);
        apiService = TestBed.inject(ApiService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with correct initial values', () => {
        expect(component.loading).toBeFalsy();
        expect(component.category).toBeUndefined();
        expect(component.categories).toEqual(NewsCategories);
        expect(component.stories).toBeUndefined();
    });

    it('should render the "Top Stories" title', () => {
        const titleElement = fixture.nativeElement.getElementsByClassName('display-3');
        expect(titleElement[0].textContent.trim()).toContain('Top Stories');
    });

    it('should render the category selection toggle group', () => {
        const toggleGroupElement = fixture.nativeElement.getElementsByClassName('mat-button-toggle-group');
        expect(toggleGroupElement).toBeTruthy();
    });

    it('should set the category when the category is changed', () => {
        const category = 'World';
        component.categoryChanged({ value: category } as MatButtonToggleChange);
        expect(component.category).toEqual(category);
    });

    it('should render the loading spinner if stories are not loaded', () => {
        component.loading = true;
        fixture.detectChanges();
        const spinnerElement = fixture.nativeElement.getElementsByClassName('mat-spinner');
        expect(spinnerElement).toBeTruthy();
    });

    it('should render the list of stories if stories are loaded', () => {
        component.stories = [{
            title: 'A New Story',
            multimedia: [{
                url: 'https://example.com/image.jpg',
                caption: 'test',
                copyright: '',
                format: '',
                subtype: '',
                type: ''
            }],
            abstract: '',
            byline: ''
        } as Story];

        fixture.detectChanges();
        const postElements = fixture.nativeElement.querySelectorAll('app-post');        
        expect(postElements.length).toBe(1);
        expect(postElements[0].textContent).toContain('A New Story');
    });

    it('should open a dialog to display the details of a story', () => {
        const index = 0;
        const story = {
            multimedia: [
                {
                    url: 'https://example.com/image.jpg',
                    caption: 'test',
                    copyright: '',
                    format: '',
                    subtype: '',
                    type: ''
                }
            ],
            title: 'Sample title',
        } as Story;

        spyOn(matDialog, 'open');

        component.stories = [story];
        component.seeDetails(index);

        expect(matDialog.open).toHaveBeenCalledWith(PostDetailComponent, {
            data: { type: 'story', value: story },
            panelClass: 'fullscreen-dialog',
        });
    });

    it('should retrieve stories from the API and update the component properties', async () => {
        const category = 'sampleCategory';
        const mockResponse = {
            results: [
                {
                    multimedia: [
                        {
                            caption: 'Sample caption',
                        },
                    ],
                    title: 'Sample title',
                },
            ],
        } as StoryResponse;

        spyOn(apiService, 'get').and.returnValue(of(mockResponse));

        await component.getStories(category);

        expect(component.loading).toBeFalsy();
        expect(component.stories).toEqual(mockResponse.results);
        expect(apiService.get).toHaveBeenCalledWith(
            `${environment.newYorkTimes.ApiURL}/${Endpoints.stories}/${category}.json`
        );
    });
});