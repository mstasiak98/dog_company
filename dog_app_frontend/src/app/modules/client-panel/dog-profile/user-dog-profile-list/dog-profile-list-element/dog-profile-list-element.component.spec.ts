import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProfileListElementComponent } from './dog-profile-list-element.component';

describe('DogProfileListElementComponent', () => {
  let component: DogProfileListElementComponent;
  let fixture: ComponentFixture<DogProfileListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogProfileListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogProfileListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
