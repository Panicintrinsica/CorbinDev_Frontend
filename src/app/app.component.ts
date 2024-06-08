import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {UiNavComponent} from "./modules/ui/ui-nav/ui-nav.component";
import {UiFooterComponent} from "./modules/ui/ui-footer/ui-footer.component";
import {slideInAnimation} from "./animations/route.anim";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UiNavComponent, UiFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'corbin.dev';

  constructor(private contexts: ChildrenOutletContexts) {}

  ngOnInit() {
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
