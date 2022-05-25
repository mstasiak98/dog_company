import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementDashboardComponent } from './announcement-dashboard.component';

describe('AnnouncementDashboardComponent', () => {
  let component: AnnouncementDashboardComponent;
  let fixture: ComponentFixture<AnnouncementDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
