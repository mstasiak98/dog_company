import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDogProfileComponent } from './create-dog-profile.component';

describe('CreateDogProfileComponent', () => {
  let component: CreateDogProfileComponent;
  let fixture: ComponentFixture<CreateDogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDogProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
