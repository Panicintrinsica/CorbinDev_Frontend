import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home-keyart',
  standalone: true,
  imports: [],
  templateUrl: './home-keyart.component.html',
  styleUrl: './home-keyart.component.scss'
})
export class HomeKeyartComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  ngAfterViewInit() {
    this.videoElement.nativeElement.play();
  }
}
