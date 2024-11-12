import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CvProject,
  Project,
  ProjectIndexItem,
  ProjectLink,
} from '../models/project.model';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private API = environment.API;

  projects: Subject<Project[]> = new Subject();
  cvProjects: Subject<CvProject[]> = new Subject();

  constructor(private http: HttpClient) {}

  getProjectsBySkill(skillID: string): Observable<ProjectLink[]> {
    return this.http
      .get<ProjectLink[]>(`${this.API}/projects/bySkill/${skillID}`)
      .pipe(
        map((response: any[]) =>
          response.map((item) => {
            return {
              id: item.project.id,
              name: item.project.name,
              group: item.project.group,
              slug: item.project.slug,
            };
          }),
        ),
      );
  }

  /**
   * Returns a list of projects with minimal details. Used mainly for the CV Builder.
   * @param projectIDs
   */
  getCvProjects(projectIDs: string[]): Observable<CvProject[]> {
    this.http
      .post<CvProject[]>(`${this.API}/projects/forCV`, {
        ids: projectIDs,
      })
      .subscribe((response: CvProject[]) => {
        this.cvProjects.next(response);
      });
    return this.cvProjects;
  }

  /**
   * Fetches the full index of projects from the API.
   *
   * @return {Observable<ProjectIndexItem[]>} An observable emitting an array of ProjectIndexItem objects.
   */
  getProjectIndex(): Observable<ProjectIndexItem[]> {
    return this.http.get<ProjectIndexItem[]>(`${this.API}/projects/fullIndex`);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API}/projects`);
  }

  getProjectBySlug(slug: string): Observable<Project> {
    return this.http.get<Project>(`${this.API}/projects/bySlug/${slug}`);
  }

  getCvProjectSubject(): Observable<CvProject[]> {
    return this.cvProjects;
  }
}
