import { Component } from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MarkdownComponent} from "ngx-markdown";
import {Observable, tap} from "rxjs";
import {Project} from "../../models/project.model";
import {ServerService} from "../../services/server.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {UiProjectCardComponent} from "../../components/ui-project-card/ui-project-card.component";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatAnchor,
    DatePipe,
    MarkdownComponent,
    NgClass,
    AsyncPipe,
    MatTabGroup,
    MatTab,
    UiProjectCardComponent,
    NgForOf,
    NgIf,
    MatChipListbox,
    MatChipOption,
    TitleCasePipe
  ],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  project$: Observable<Project[]>

  resultSet: Project[] = []
  filteredProjects: Project[] = []

  categoryOptions = ['web','desktop','mobile','multi','game']
  groupOptions = ['personal','professional','university','open source']

  selectedCategories = new Set<string>();
  selectedGroups = new Set<string>();

  constructor(public dialog: MatDialog, private server: ServerService) {
    this.project$ = this.server.getProjects().pipe(tap((result) => {
      this.resultSet = result
      this.filteredProjects = result
    }))
  }

  selectCategories(filterKey: string) {
    if (this.selectedCategories.has(filterKey)) {
      this.selectedCategories.delete(filterKey);
    } else {
      this.selectedCategories.add(filterKey);
    }
    this.updateList()
  }

  selectGroups(filterKey: string) {
    if (this.selectedGroups.has(filterKey)) {
      this.selectedGroups.delete(filterKey);
    } else {
      this.selectedGroups.add(filterKey);
    }
    this.updateList()
  }


  updateList(){
    let newResults: Project[] = this.resultSet

    if (this.selectedCategories.size != 0) {
      newResults = this.filterByCategory(newResults, Array.from(this.selectedCategories.keys()));
    }

    if (this.selectedGroups.size != 0) {
      newResults = this.filterByGroup(newResults, Array.from(this.selectedGroups.keys()));
    }

    console.log(newResults)

    this.filteredProjects = newResults
  }

  filterByCategory(array: Project[], selectedFilters: string[]){
    return array.filter(project => selectedFilters.includes(project.category));
  }

  filterByGroup(array: Project[], selectedFilters: string[]){
    return array.filter(project => selectedFilters.includes(project.group));
  }
}


