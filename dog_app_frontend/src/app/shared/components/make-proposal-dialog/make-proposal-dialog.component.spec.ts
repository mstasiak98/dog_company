import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeProposalDialogComponent } from './make-proposal-dialog.component';

describe('MakeProposalDialogComponent', () => {
  let component: MakeProposalDialogComponent;
  let fixture: ComponentFixture<MakeProposalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeProposalDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeProposalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
