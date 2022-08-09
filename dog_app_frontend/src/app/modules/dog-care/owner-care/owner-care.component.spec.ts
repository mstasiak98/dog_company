import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerCareComponent } from './owner-care.component';

describe('OwnerCareComponent', () => {
  let component: OwnerCareComponent;
  let fixture: ComponentFixture<OwnerCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerCareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
