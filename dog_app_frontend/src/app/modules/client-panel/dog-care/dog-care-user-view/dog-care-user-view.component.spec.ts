import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCareUserViewComponent } from './dog-care-user-view.component';

describe('DogCareUserViewComponent', () => {
  let component: DogCareUserViewComponent;
  let fixture: ComponentFixture<DogCareUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogCareUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogCareUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
