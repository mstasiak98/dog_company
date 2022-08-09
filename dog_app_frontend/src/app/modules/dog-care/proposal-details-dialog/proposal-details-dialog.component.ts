import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proposal-details-dialog',
  templateUrl: './proposal-details-dialog.component.html',
  styleUrls: ['./proposal-details-dialog.component.scss'],
})
export class ProposalDetailsDialogComponent implements OnInit {
  withSiblings: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
