import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ui-search.component.html',
  styleUrl: './ui-search.component.scss',
})
export class UiSearchComponent {
  searchTerm: string = '';

  @Output() searchSubmitted = new EventEmitter<string>();

  onSubmit(): void {
    this.searchSubmitted.emit(this.searchTerm);
  }
}
