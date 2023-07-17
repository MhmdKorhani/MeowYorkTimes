import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CommonService', () => {
    let snackbar: MatSnackBar;
    let service: CommonService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule,
                BrowserAnimationsModule
            ],
            providers: [MatSnackBar]
        });
        service = TestBed.inject(CommonService);
        snackbar = TestBed.inject(MatSnackBar);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /**
     * Test case to verify that the `presentError` method of the service calls the `MatSnackBar.open` method
     * with the provided error message.
     * @returns None
     */
    it('should call MatSnackBar.open when error is provided', () => {
        const snackBarSpy = spyOn(snackbar, 'open');
        const error = 'Oups!';
        service.presentError(error);
        expect(snackBarSpy).toHaveBeenCalledWith(error, '❗');
    });

    /**
     * Test case to verify that the MatSnackBar.open method is not called when the error message is an empty string.
     * @returns None
     */
    it('should not call MatSnackBar.open when error is empty string', () => {
        const snackBarSpy = spyOn(snackbar, 'open');
        service.presentError('');
        expect(snackBarSpy).not.toHaveBeenCalled();
    });
});