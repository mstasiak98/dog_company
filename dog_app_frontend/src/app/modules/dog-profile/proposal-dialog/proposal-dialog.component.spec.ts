import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDialogComponent } from './proposal-dialog.component';

describe('ProposalDialogComponent', () => {
  let component: ProposalDialogComponent;
  let fixture: ComponentFixture<ProposalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
