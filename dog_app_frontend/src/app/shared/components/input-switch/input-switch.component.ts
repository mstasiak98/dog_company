import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss'],
})
export class InputSwitchComponent implements OnInit {
  @Input() checked: boolean;
  @Output() stateChangedEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  processStatusChange(): void {
    this.stateChangedEvent.emit(this.checked);
  }
}
