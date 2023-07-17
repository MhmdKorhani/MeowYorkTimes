import { TestBed } from '@angular/core/testing';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test case for the getReadableDate function.
   * It verifies that the function returns the expected readable date format.
   * @returns None
   */
  it('should return readable date format', () => {
    const result = service.getReadableDate(new Date(1996, 4, 1));
    expect(result).toBe("Wednesday 01 May 1996");
  });

  /**
   * Test case for the getSystemDateFormat function.
   * It verifies that the function returns the correct system date format for a given date.
   * @test {getSystemDateFormat}
   */
  it('should return system date format', () => {
    const result = service.getSystemDateFormat(new Date(1996, 4, 1));
    expect(result).toBe("1996-05-01");
  });
});
