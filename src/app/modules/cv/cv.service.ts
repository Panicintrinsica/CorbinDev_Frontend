import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Profile } from '../../models/profile.model';
import { ServerService } from '../../services/server.service';
import { Skill } from '../../models/skill.model';
import { Education } from '../../models/education.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  public defaultConfig: cvConfig = {
    showBluesky: false,
    showInstagram: false,
    showPixelfed: false,
    showAwards: false,
    showBanner: true,
    showBannerDecor: true,
    showCerts: false,
    showContacts: true,
    showEducation: true,
    showEmail: true,
    showEvilPhone: true,
    showGPA: false,
    showGithub: false,
    showHeader: true,
    showInfo: true,
    showIntro: true,
    showLearning: false,
    showLinkedIn: true,
    showMastodon: false,
    showObjective: false,
    showPhone: true,
    showPhoto: false,
    showProgress: true,
    showProjects: true,
    showSkillDetails: true,
    showSkills: true,
    showTwitch: false,
    ShowWebsite: true,
    showYouTube: false,
    showSalutation: true,
    showValediction: true,
    skillDecor: 'none',
    theme: 'dark',
  };

  private profileSubject$ = new BehaviorSubject<Profile | null>(null);
  public profile$ = this.profileSubject$.asObservable();

  private educationSubject$ = new BehaviorSubject<Education[] | null>(null);
  public education$ = this.educationSubject$.asObservable();

  private skillsSubject$ = new BehaviorSubject<Skill[] | null>(null);
  public skills$ = this.skillsSubject$.asObservable();

  theme$: BehaviorSubject<string> = new BehaviorSubject<string>('dark');
  config$ = new BehaviorSubject<cvConfig>(this.defaultConfig);

  constructor(
    private server: ServerService,
    private http: HttpClient,
  ) {
    this.loadEducation();
    this.loadSkills();
  }

  getConfig() {
    return this.config$.asObservable();
  }

  getTheme() {
    return this.theme$.asObservable();
  }

  loadEducation() {
    this.server
      .getEducation()
      .pipe(tap((result) => this.educationSubject$.next(result)))
      .subscribe();
  }

  loadSkills() {
    this.server
      .getAllSkills()
      .pipe(
        tap((result) => {
          this.skillsSubject$.next(result);
        }),
      )
      .subscribe();
  }

  getDefaultCover(): Observable<string> {
    return this.http.get('assets/yourfile.md', { responseType: 'text' });
  }

  updateConfig(config: cvConfig) {
    this.config$.next(config);
  }
}

export interface cvConfig {
  [index: string]: any;
  theme: string;
  skillDecor: string;
  showBanner: boolean;
  showBannerDecor: boolean;
  showSkillDetails: boolean;
  showHeader: boolean;
  showIntro: boolean;
  showContacts: boolean;
  showSkills: boolean;
  showPhoto: boolean;
  showInfo: boolean;
  showProgress: boolean;
  showLearning: boolean;
  showProjects: boolean;
  showEducation: boolean;
  showGPA: boolean;
  showCerts: boolean;
  showAwards: boolean;
  showObjective: boolean;
  showEmail: boolean;
  showPhone: boolean;
  showEvilPhone: boolean;
  ShowWebsite: boolean;
  showLinkedIn: boolean;
  showGithub: boolean;
  showMastodon: boolean;
  showTwitch: boolean;
  showYouTube: boolean;
  showSalutation: boolean;
  showValediction: boolean;
  showInstagram: boolean;
  showPixelfed: boolean;
  showBluesky: boolean;
}
