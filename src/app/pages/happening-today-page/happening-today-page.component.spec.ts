import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappeningTodayPageComponent } from './happening-today-page.component';

describe('HappeningTodayPageComponent', () => {
  let component: HappeningTodayPageComponent;
  let fixture: ComponentFixture<HappeningTodayPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HappeningTodayPageComponent]
    });
    fixture = TestBed.createComponent(HappeningTodayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
