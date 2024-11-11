import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project, ProjectLink } from '../models/project.model';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private API = environment.API;

  projects: Subject<Project[]> = new Subject();
  selectedProjects: Subject<Project[]> = new Subject();

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
  getProjectsByIDs(projectIDs: string[]): Observable<Project[]> {
    this.http
      .post<Project[]>(`${this.API}/projects/forCV`, {
        ids: projectIDs,
      })
      .subscribe((response: Project[]) => {
        this.selectedProjects.next(response);
      });
    return this.selectedProjects;
  }

  getSelectedProjects(): Observable<Project[]> {
    return this.selectedProjects;
  }
}
