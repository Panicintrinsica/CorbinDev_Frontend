import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-tag',
  templateUrl: './tag.component.html',
  standalone: true,
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() text: string | undefined = '';
  @Input() type: string | undefined = '';

  @HostBinding('class')
  get elementClass(): string {
    return this.type?.toLowerCase() || '';
  }
}
