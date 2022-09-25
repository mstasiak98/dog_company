import { Component, OnInit } from '@angular/core';
import { Thread } from '../../../../shared/models/messages/messages';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import { LazyLoadEvent } from 'primeng/api';
import { Link } from '../../../../shared/models/pagination/Link';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  isContentLoading: boolean = false;
  threads: Thread[] = [];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  threadsPerPage: number = 10;
  totalThreads: number;

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.getThreads();
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    console.log('limnk = ', link!.url);

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

      console.log('data = ', data);
    };
  }

  private getThreads() {
    this.isContentLoading = true;
    this.messagesService
      .getThreads()
      .subscribe(this.processChangePageResults());
  }
}
