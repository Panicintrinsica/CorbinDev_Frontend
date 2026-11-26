import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import type { HomeCard, HomeSkill, PublicHomeCard } from '../models/home.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);
  private API = environment.API;

  /** The published cards, or null when no configuration has been saved. */
  cards() {
    return this.http
      .get<{ config: { cards: PublicHomeCard[] } | null }>(`${this.API}/home`)
      .pipe(map((response) => response.config?.cards ?? null));
  }

  /** The cards as stored, for editing. */
  editable() {
    return this.http
      .get<{ config: { cards: HomeCard[] } | null }>(`${this.API}/home/admin`)
      .pipe(map((response) => response.config?.cards ?? null));
  }

  save(cards: HomeCard[]) {
    return this.http
      .put<{ config: { cards: HomeCard[] } }>(`${this.API}/home/admin`, { cards })
      .pipe(map((response) => response.config.cards));
  }

  /** Published skills: the ones a card can show. */
  skills() {
    return this.http.get<HomeSkill[]>(`${this.API}/skills`);
  }
}
