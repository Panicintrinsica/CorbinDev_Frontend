import { Component } from '@angular/core';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [],
  templateUrl: './ui-footer.component.html',
  styleUrl: './ui-footer.component.scss'
})
export class UiFooterComponent {
  year: any = new Date().getFullYear();


}
