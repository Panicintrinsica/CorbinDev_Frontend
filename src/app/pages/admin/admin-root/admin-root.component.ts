import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './admin-root.component.html',
  styleUrl: './admin-root.component.scss'
})
export class AdminRootComponent {

}
