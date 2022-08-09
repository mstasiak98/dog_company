import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardianCareComponent } from './guardian-care.component';

describe('GuardianCareComponent', () => {
  let component: GuardianCareComponent;
  let fixture: ComponentFixture<GuardianCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardianCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardianCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
