import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCareComponent } from './dog-care.component';

describe('DogCareComponent', () => {
  let component: DogCareComponent;
  let fixture: ComponentFixture<DogCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogCareComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
