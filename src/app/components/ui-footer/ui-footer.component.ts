import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {NgClass} from "@angular/common";

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './ui-footer.component.html',
  styleUrl: './ui-footer.component.scss'
})
export class UiFooterComponent implements OnInit, OnDestroy {
  year: any = new Date().getFullYear();
  isHomePage: any;

  currentRoute$!: Subscription
  loading = false;

  constructor(private router: Router) {
    this.isHomePage = this.router.url === '/';
    console.log(this.router.url)
  }

  ngOnInit() {
    this.currentRoute$ = this.router.events.subscribe(event => {
      let currentRoute = this.router.url;  // Grabs current route
      this.isHomePage = currentRoute === '/' || currentRoute === '/home';  // Checks if current route is home route

      switch (true) {
        case event instanceof NavigationStart: {
          console.log('starting')
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd: {
          setTimeout(() => this.loading = false, 300);
          break;
        }
        default: {
          break;
        }
      }


    });
  }

  ngOnDestroy(){
    this.currentRoute$.unsubscribe()
  }




}
