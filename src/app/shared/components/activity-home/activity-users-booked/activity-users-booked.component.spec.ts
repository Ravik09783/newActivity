import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivityUsersBookedComponent } from './activity-users-booked.component';

describe('ActivityUsersBookedComponent', () => {
  let component: ActivityUsersBookedComponent;
  let fixture: ComponentFixture<ActivityUsersBookedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityUsersBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityUsersBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
