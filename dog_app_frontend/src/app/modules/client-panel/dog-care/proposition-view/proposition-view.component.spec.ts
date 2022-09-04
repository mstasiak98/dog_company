import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionViewComponent } from './proposition-view.component';

describe('PropositionViewComponent', () => {
  let component: PropositionViewComponent;
  let fixture: ComponentFixture<PropositionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PropositionViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
