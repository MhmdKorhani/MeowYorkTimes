import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent]
    });
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two options', () => {
    const cards = fixture.nativeElement.getElementsByClassName('display-6');
    expect(cards.length).toBe(2);
    expect(cards[0].textContent.trim()).toBe('Top Stories');
    expect(cards[1].textContent.trim()).toBe('Articles');
  });
});