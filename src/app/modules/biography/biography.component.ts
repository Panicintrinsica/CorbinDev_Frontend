import { Component } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { MarkdownComponent } from 'ngx-markdown';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Detail } from '../../models/detail.model';
import { Observable } from 'rxjs';
import { ContentBlock } from '../../models/content.model';
import { getContentBody, getDetail } from '../../utilities';
import { MatButton } from '@angular/material/button';
import { BioBooksComponent } from './sections/bio-books/bio-books.component';
import { BioDrinksComponent } from './sections/bio-drinks/bio-drinks.component';
import { BioEngineerComponent } from './sections/bio-engineer/bio-engineer.component';
import { BioFashionComponent } from './sections/bio-fashion/bio-fashion.component';
import { BioFoodComponent } from './sections/bio-food/bio-food.component';
import { BioGamesComponent } from './sections/bio-games/bio-games.component';
import { BioMusicComponent } from './sections/bio-music/bio-music.component';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [
    MarkdownComponent,
    AsyncPipe,
    FormsModule,
    MatButton,
    BioBooksComponent,
    BioDrinksComponent,
    BioEngineerComponent,
    BioFashionComponent,
    BioFoodComponent,
    BioGamesComponent,
    BioMusicComponent,
    NgClass,
  ],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss',
})
export class BiographyComponent {
  content$: Observable<ContentBlock[]>;

  details: any = {};
  details$: Observable<Detail[]>;

  sections: { id: string; title: string }[] = [
    { id: 'books', title: 'Books' },
    { id: 'drinks', title: 'Drinks' },
    { id: 'engineer', title: 'Engineering' },
    { id: 'fashion', title: 'Fashion' },
    { id: 'food', title: 'Food' },
    { id: 'games', title: 'Games' },
    { id: 'music', title: 'Music' },
  ];

  selection: string = '';

  constructor(private server: ServerService) {
    this.content$ = server.getContentGroup('bio');
    this.details$ = server.getAllDetails();
  }

  protected readonly getContentBody = getContentBody;
  protected readonly getDetail = getDetail;

  makeSelection(id: string) {
    this.selection = id;
  }
}
