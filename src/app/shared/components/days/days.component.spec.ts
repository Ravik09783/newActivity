import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaysComponent } from './days.component';

describe('DaysComponent', () => {
  let component: DaysComponent;
  let fixture: ComponentFixture<DaysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
