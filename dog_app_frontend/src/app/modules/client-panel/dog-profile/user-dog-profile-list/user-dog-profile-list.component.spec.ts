import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDogProfileListComponent } from './user-dog-profile-list.component';

describe('UserDogProfileListComponent', () => {
  let component: UserDogProfileListComponent;
  let fixture: ComponentFixture<UserDogProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDogProfileListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDogProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
