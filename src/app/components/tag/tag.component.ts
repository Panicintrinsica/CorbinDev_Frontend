import {Component, HostBinding, Input} from '@angular/core';
import {LowerCasePipe, NgClass} from "@angular/common";

@Component({
  selector: 'ui-tag',
  standalone: true,
  imports: [
    LowerCasePipe,
    NgClass
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() text: string | undefined = "";
  @Input() type: string | undefined = "";

  @HostBinding('class')
  get elementClass(): string {
    return this.type?.toLowerCase() || "";
  }

}
