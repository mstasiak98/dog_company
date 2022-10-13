import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ViewportScroller, DOCUMENT } from '@angular/common';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs';
import { AuthStateService } from '../shared/services/auth-state/auth-state.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isLoggedIn: boolean;
  readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(map(() => this.viewport.getScrollPosition()?.[1] > 300));

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly viewport: ViewportScroller,
    private authStateService: AuthStateService
  ) {}
  ngOnInit() {
    this.isLoggedIn = this.authStateService.isLoggedIn();
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }

  scrollTo(anchorId: string): void {
    this.viewport.scrollToAnchor(anchorId);
  }
}
