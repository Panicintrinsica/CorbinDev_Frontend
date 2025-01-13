import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectCard, ProjectLink } from '../../models/project.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private API = environment.API;

  private _projectCards = signal<ProjectCard[]>([]);
  private _projectDetails = signal<Project>({
    blurb: '',
    category: '',
    client: '',
    details: '',
    endDate: '',
    isCurrent: false,
    isFeatured: false,
    isPublished: false,
    link: '',
    linkType: '',
    name: '',
    platform: '',
    role: '',
    skills: [],
    startDate: '',
    thumbnail: '',
    uri: '',
  });
  private _projectLinks = signal<ProjectLink[]>([]);

  get projectCards() {
    return this._projectCards;
  }
  get projectDetails() {
    return this._projectDetails;
  }

  get projectLinks() {
    return this._projectLinks;
  }

  constructor(private http: HttpClient) {}

  fetchPublicProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API}/projects`);
  }

  fetchProjectByURI(uri: string) {
    return this.http
      .get<Project>(`${this.API}/projects/byURI/${uri}`)
      .subscribe((project) => {
        this._projectDetails.set(project);
      });
  }

  fetchProjectsBySkill(_id: string) {
    return this.http
      .get<ProjectLink[]>(`${this.API}/projects/bySkill/${_id}`)
      .subscribe((project) => {
        this._projectLinks.set(project);
      });
  }
}
