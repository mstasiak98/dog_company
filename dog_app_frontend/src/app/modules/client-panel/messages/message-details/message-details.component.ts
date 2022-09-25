import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.scss'],
})
export class MessageDetailsComponent implements OnInit {
  isContentLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
