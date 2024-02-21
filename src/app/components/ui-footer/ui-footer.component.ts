import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [],
  templateUrl: './ui-footer.component.html',
  styleUrl: './ui-footer.component.scss'
})
export class UiFooterComponent implements OnInit, OnDestroy {
  year: any = new Date().getFullYear();
  isHomePage: any;

  currentRoute$!: Subscription

  constructor(private router: Router) {
    this.isHomePage = this.router.url === '/';
    console.log(this.router.url)
  }

  ngOnInit() {
    this.currentRoute$ = this.router.events.subscribe(event => {
      let currentRoute = this.router.url;  // Grabs current route
      this.isHomePage = currentRoute === '/' || currentRoute === '/home';  // Checks if current route is home route
    });
  }

  ngOnDestroy(){
    this.currentRoute$.unsubscribe()
  }




}
