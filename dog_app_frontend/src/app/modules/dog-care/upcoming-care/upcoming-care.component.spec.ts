import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingCareComponent } from './upcoming-care.component';

describe('UpcomingCareComponent', () => {
  let component: UpcomingCareComponent;
  let fixture: ComponentFixture<UpcomingCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
