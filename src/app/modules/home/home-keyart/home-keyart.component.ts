import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-home-keyart',
  imports: [],
  templateUrl: './home-keyart.component.html',
  styleUrl: './home-keyart.component.scss',
  standalone: true,
})
export class HomeKeyartComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.ensureVideoPlays();
  }

  private ensureVideoPlays(): void {
    const video = document.querySelector('video');

    if (!video) return;

    const promise = video.play();
    if (promise !== undefined) {
      promise
        .then(() => {})
        .catch(() => {
          video.muted = true;
          video.play();
        });
    }
  }
}
