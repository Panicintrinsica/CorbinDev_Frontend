import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home-keyart',
  standalone: true,
  imports: [],
  templateUrl: './home-keyart.component.html',
  styleUrl: './home-keyart.component.scss'
})
export class HomeKeyartComponent implements AfterViewInit {

  ngAfterViewInit(){
    this.ensureVideoPlays()
  }

  private ensureVideoPlays(): void{
    const video = document.querySelector("video");

    if(!video) return;

    const promise = video.play();
    if(promise !== undefined){
      promise.then(() => {
      }).catch(error => {
        video.muted = true;
        video.play();
      });
    }
  }
}
