import { Component, ViewChild } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { Observable, tap } from 'rxjs';
import { Project } from '../../../models/project.model';
import { ServerService } from '../../../services/server.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ProjectCardComponent } from '../components/ui-project-card/project-card.component';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { ProjectGroups, ProjectTypes } from '../../../constants/project.consts';
import { UiSearchComponent } from '../../ui/ui-search/ui-search.component';

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
    ProjectCardComponent,
    NgForOf,
    NgIf,
    MatChipListbox,
    MatChipOption,
    TitleCasePipe,
    FormsModule,
    UiSearchComponent,
  ],
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.scss',
})
export class ProjectListPageComponent {
  @ViewChild('categoryList') categoryList!: MatChipListbox;
  @ViewChild('groupList') groupList!: MatChipListbox;

  project$: Observable<Project[]>;

  resultSet: Project[] = [];
  filteredProjects: Project[] = [];

  categoryOptions = ProjectTypes;
  groupOptions = ProjectGroups;

  selectedCategories = new Set<string>();
  selectedGroups = new Set<string>();
  searchString: string = '';

  constructor(
    public dialog: MatDialog,
    private server: ServerService,
  ) {
    this.project$ = this.server.getProjects().pipe(
      tap((result) => {
        this.resultSet = result;
        this.filteredProjects = result;
      }),
    );
  }

  selectCategories(filterKey: string) {
    if (this.selectedCategories.has(filterKey)) {
      this.selectedCategories.delete(filterKey);
    } else {
      this.selectedCategories.add(filterKey);
    }
    this.updateList();
  }

  selectGroups(filterKey: string) {
    if (this.selectedGroups.has(filterKey)) {
      this.selectedGroups.delete(filterKey);
    } else {
      this.selectedGroups.add(filterKey);
    }
    this.updateList();
  }

  updateList() {
    let newResults: Project[] = this.resultSet;

    if (this.selectedCategories.size != 0) {
      newResults = this.filterByCategory(
        newResults,
        Array.from(this.selectedCategories.keys()),
      );
    }

    if (this.selectedGroups.size != 0) {
      newResults = this.filterByGroup(
        newResults,
        Array.from(this.selectedGroups.keys()),
      );
    }

    if (this.searchString.length > 3) {
      newResults = this.filterByName(newResults, this.searchString);
    }

    this.filteredProjects = newResults;
  }

  filterByName(array: Project[], searchString: string) {
    searchString = searchString.toLowerCase();
    return array.filter(
      (project) =>
        project.name.toLowerCase().includes(searchString) ||
        project.shortDescription.toLowerCase().includes(searchString),
    );
  }

  filterByCategory(array: Project[], selectedFilters: string[]) {
    return array.filter((project) =>
      selectedFilters.includes(project.category),
    );
  }

  filterByGroup(array: Project[], selectedFilters: string[]) {
    return array.filter((project) => selectedFilters.includes(project.group));
  }

  resetFilters() {
    this.categoryList._chips.forEach((chip) => {
      chip.deselect();
    });
    this.groupList._chips.forEach((chip) => {
      chip.deselect();
    });
    this.searchString = '';
    this.updateList();
  }
}
