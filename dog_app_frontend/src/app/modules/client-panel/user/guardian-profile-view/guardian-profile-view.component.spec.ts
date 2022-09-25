import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianProfileViewComponent } from './guardian-profile-view.component';

describe('GuardianProfileViewComponent', () => {
  let component: GuardianProfileViewComponent;
  let fixture: ComponentFixture<GuardianProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianProfileViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
