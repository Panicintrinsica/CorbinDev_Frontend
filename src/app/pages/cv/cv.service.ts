import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {Profile} from "../../models/profile.model";
import {ServerService} from "../../services/server.service";
import {Skill} from "../../models/skill.model";
import {Education} from "../../models/education.model";

@Injectable({
  providedIn: 'root'
})
export class CvService implements OnDestroy {

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
    showProjects: false,
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


  theme: BehaviorSubject<string> = new BehaviorSubject<string>('dark')

  profile!: Subject<Profile>
  skills!: Subject<Skill[]>
  education!: Subject<Education[]>
  config = new BehaviorSubject<cvConfig>(this.defaultConfig)

  profile$: Subscription;
  skill$: Subscription;
  education$: Subscription;

  constructor(private server: ServerService) {
    this.profile$ = server.getProfile().subscribe({
      next: value => {
        this.profile.next(value)
      },
      error: err => console.error(err)
    });
    this.skill$ = server.getAllSkills().subscribe({
      next: value => this.skills.next(value),
      error: err => console.error(err)
    });
    this.education$ = server.getEducation().subscribe({
      next: value => this.education.next(value),
      error: err => console.error(err)
    })
  }

  getConfig(){
    return this.config.asObservable();
  }

  getSkills(): Observable<Skill[]> {
      return this.skills.asObservable();
  }

  getEducation(): Observable<Education[]> {
      return this.education.asObservable();
  }

  getProfile(): Observable<Profile> {
      return this.profile.asObservable();
  }

  ngOnDestroy() {
    this.profile$.unsubscribe()
    this.skill$.unsubscribe();
    this.education$.unsubscribe();
  }

}

export interface cvConfig {
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
