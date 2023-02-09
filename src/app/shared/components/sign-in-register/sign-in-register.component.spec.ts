import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignInRegisterComponent } from './sign-in-register.component';

describe('SignInRegisterComponent', () => {
  let component: SignInRegisterComponent;
  let fixture: ComponentFixture<SignInRegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
