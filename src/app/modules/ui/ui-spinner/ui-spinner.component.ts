import {Component, Input} from '@angular/core';

@Component({
    selector: 'ui-spinner',
    imports: [],
    templateUrl: './ui-spinner.component.html',
    styleUrl: './ui-spinner.component.scss'
})
export class UiSpinnerComponent {
  @Input() timeout: number | null = null
  @Input() message: string = ""

  showSpinner: boolean = true
  showText: boolean = false

  ngOnInit() {
    if (this.timeout) {
      setTimeout(() => {
        this.showSpinner = false
        this.showText = true
      }, this.timeout)
    }
  }

}
