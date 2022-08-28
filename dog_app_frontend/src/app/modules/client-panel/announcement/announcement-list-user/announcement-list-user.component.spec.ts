import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListUserComponent } from './announcement-list-user.component';

describe('AnnouncementListUserComponent', () => {
  let component: AnnouncementListUserComponent;
  let fixture: ComponentFixture<AnnouncementListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
