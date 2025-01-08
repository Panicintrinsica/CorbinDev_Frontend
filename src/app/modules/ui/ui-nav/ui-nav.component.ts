import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ui-nav',
  imports: [
    MatToolbar,
    RouterLink,
    MatButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './ui-nav.component.html',
  styleUrl: './ui-nav.component.scss',
  standalone: true,
})
export class UiNavComponent {}
