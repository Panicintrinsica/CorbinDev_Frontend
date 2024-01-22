import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChildrenOutletContexts, RouterOutlet} from '@angular/router';
import {UiNavComponent} from "./components/ui-nav/ui-nav.component";
import {UiFooterComponent} from "./components/ui-footer/ui-footer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {slideInAnimation} from "./animations/route.anim";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UiNavComponent, UiFooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent {
  title = 'corbin.dev';
    constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
