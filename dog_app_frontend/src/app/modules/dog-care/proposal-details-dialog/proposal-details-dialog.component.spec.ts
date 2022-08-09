import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetailsDialogComponent } from './proposal-details-dialog.component';

describe('ProposalDetailsDialogComponent', () => {
  let component: ProposalDetailsDialogComponent;
  let fixture: ComponentFixture<ProposalDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
