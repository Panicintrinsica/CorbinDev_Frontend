import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'app-home-feature',
    imports: [
        NgOptimizedImage,
        NgClass,
        RouterLink
    ],
    templateUrl: './home-feature.component.html',
    styleUrl: './home-feature.component.scss'
})
export class HomeFeatureComponent {
  @Input() header = "";
  @Input() content = "";
  @Input() image = "";
  @Input() color = "";
  @Input() isAlternate = false;
  @Input() route = ""
  @Input() stack: featuredStackItem[] = [];
}

export interface featuredStackItem {
  img: string
  alt: string
  link?: string
}
