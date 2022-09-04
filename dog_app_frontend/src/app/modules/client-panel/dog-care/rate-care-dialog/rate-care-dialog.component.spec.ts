import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCareDialogComponent } from './rate-care-dialog.component';

describe('RateCareDialogComponent', () => {
  let component: RateCareDialogComponent;
  let fixture: ComponentFixture<RateCareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateCareDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateCareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
