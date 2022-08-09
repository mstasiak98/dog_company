import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dog-care',
  templateUrl: './dog-care.component.html',
  styleUrls: ['./dog-care.component.scss'],
})
export class DogCareComponent implements OnInit {
  isContentLoading = false;
  menus: MenuItem[];
  activeMenu: MenuItem;
  activeUrl: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeUrl = this.router.url;

    this.menus = [
      {
        label: 'Panel właściciela',
        icon: 'pi pi-fw pi-home',
        command: event => {
          this.activeMenu = this.menus[0];
          this.router.navigate(['opieka/wlasciciel']).then(() => {
            window.location.reload();
          });
        },
      },
      {
        label: 'Panel opiekuna',
        icon: 'pi pi-fw pi-calendar',
        command: event => {
          this.activeMenu = this.menus[1];
          this.router.navigate(['opieka/opiekun']).then(() => {
            window.location.reload();
          });
        },
      },
    ];
    this.activeMenu = this.activeUrl.includes('opiekun')
      ? this.menus[1]
      : this.menus[0];
  }
}
