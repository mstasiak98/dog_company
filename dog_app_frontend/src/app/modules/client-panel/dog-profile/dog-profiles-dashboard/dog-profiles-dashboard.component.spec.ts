import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProfilesDashboardComponent } from './dog-profiles-dashboard.component';

describe('DogProfilesDashboardComponent', () => {
  let component: DogProfilesDashboardComponent;
  let fixture: ComponentFixture<DogProfilesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogProfilesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogProfilesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
