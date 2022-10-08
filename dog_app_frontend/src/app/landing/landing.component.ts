import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller, DOCUMENT } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(map(() => this.viewport.getScrollPosition()?.[1] > 300));

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller
  ) {}
  ngOnInit() {}

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}
