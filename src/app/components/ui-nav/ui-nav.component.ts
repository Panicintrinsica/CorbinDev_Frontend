import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'ui-nav',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatButton
  ],
  templateUrl: './ui-nav.component.html',
  styleUrl: './ui-nav.component.scss'
})
export class UiNavComponent {

}
