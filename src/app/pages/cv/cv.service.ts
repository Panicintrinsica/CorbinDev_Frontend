import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription, tap} from "rxjs";
import {Profile} from "../../models/profile.model";
import {ServerService} from "../../services/server.service";
import {Skill} from "../../models/skill.model";
import {Education} from "../../models/education.model";

@Injectable({
  providedIn: 'root'
})
export class CvService {

  public defaultConfig: cvConfig = {
    showAwards: false,
    showBanner: true,
    showCerts: false,
    showContacts: false,
    showEducation: false,
    showEmail: true,
    showEvilPhone: false,
    showGPA: false,
    showGithub: false,
    showHeader: true,
    showInfo: false,
    showIntro: false,
    showLearning: false,
    showLinkedIn: false,
    showMastodon: false,
    showObjective: false,
    showPhone: true,
    showPhoto: false,
    showProgress: false,
    showProjects: true,
    showSkillDetails: false,
    showSkills: false,
    showTwitch: false,
    showURL: false,
    showYoutube: false,
    showSalutation: true,
    showValediction: true,
    skillDecor: "none",
    theme: "dark"
  };

  private profileSubject$ = new BehaviorSubject<Profile | null>(null);
  public profile$ = this.profileSubject$.asObservable();

  private educationSubject$ = new BehaviorSubject<Education[] | null>(null);
  public education$ = this.educationSubject$.asObservable();

  private skillsSubject$ = new BehaviorSubject<Skill[] | null>(null);
  public skills$ = this.skillsSubject$.asObservable();

  theme$: BehaviorSubject<string> = new BehaviorSubject<string>('dark')
  config$ = new BehaviorSubject<cvConfig>(this.defaultConfig);

  constructor(private server: ServerService) {
    this.loadProfile();
    this.loadEducation();
    this.loadSkills();
  }



  getConfig(){
    const localConfig = localStorage.getItem("cv_config")

    if (localConfig) {
      this.config$.next(JSON.parse(localConfig))
    }
    return this.config$.asObservable();
  }

  getTheme(){
    return this.theme$.asObservable();
  }

  loadProfile() {
    this.server.getProfile().pipe(
      tap(result => this.profileSubject$.next(result))
    ).subscribe();
  }

  loadEducation() {
    this.server.getEducation().pipe(
      tap(result => this.educationSubject$.next(result))
    ).subscribe();
  }

  loadSkills() {
    this.server.getAllSkills().pipe(
      tap(result => this.skillsSubject$.next(result))
    ).subscribe();
  }


  updateConfig(config: cvConfig) {
    this.config$.next(config);
    localStorage.setItem('cv_config', JSON.stringify(config))
    console.log(config)
  }
}

export interface cvConfig {
  [index: string]: any
  theme: string;
  skillDecor: string;
  showBanner: boolean;
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
  showURL: boolean;
  showLinkedIn: boolean;
  showGithub: boolean;
  showMastodon: boolean;
  showTwitch: boolean;
  showYoutube: boolean;
  showSalutation: boolean;
  showValediction: boolean;
}
