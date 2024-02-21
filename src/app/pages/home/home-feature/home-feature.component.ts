import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-feature',
  standalone: true,
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
}
