import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventComponent } from './upcoming-event.component';

describe('UpcomingEventComponent', () => {
  let component: UpcomingEventComponent;
  let fixture: ComponentFixture<UpcomingEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingEventComponent]
    });
    fixture = TestBed.createComponent(UpcomingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
