import { Component, OnDestroy, OnInit } from '@angular/core';
import { Thread } from '../../../../shared/models/messages/messages';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import { LazyLoadEvent } from 'primeng/api';
import { Link } from '../../../../shared/models/pagination/Link';
import { PusherServiceService } from '../../../../shared/services/API/pusher-service.service';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit, OnDestroy {
  isContentLoading: boolean = false;
  threads: Thread[] = [];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  threadsPerPage: number = 10;
  totalThreads: number;
  threadSubscription: Subscription;

  constructor(
    private messagesService: MessagesService,
    private pusherService: PusherServiceService
  ) {}

  ngOnInit(): void {
    this.getThreads();
    this.listenOnMessageReceived();
  }

  ngOnDestroy() {
    this.threadSubscription.unsubscribe();
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    this.messagesService
      .getThreads(link!.url)
      .subscribe(this.processChangePageResults());
  }

  private processChangePageResults() {
    return (data: any) => {
      this.threads = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.last_page;
      this.currentPage = data.meta.current_page;
      this.totalThreads = data.meta.total;
      this.threadsPerPage = data.meta.per_page;
      this.isContentLoading = false;
    };
  }

  private getThreads() {
    this.isContentLoading = true;
    this.messagesService
      .getThreads()
      .subscribe(this.processChangePageResults());
  }

  listenOnMessageReceived(): void {
    this.threadSubscription = this.pusherService
      .getThreadSubject()
      .subscribe((data: Thread) => {
        this.processReceivedMessage(data);
      });
  }

  private processReceivedMessage(data: Thread): void {
    data.is_unread = true;
    if (this.threads.length >= this.threadsPerPage) this.threads.splice(-1);

    this.threads = [...this.threads, data].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }
}
