import { Component } from '@angular/core';
import { Skill } from '../../../models/skill.model';
import { ContentService } from '../../../services/content.service';
import { SkillDialogComponent } from '../skill-dialog/skill-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SkillSearchPipe } from '../../../pipes/skill-search.pipe';
import { TagComponent } from '../../ui/ui-tag/tag.component';

@Component({
  selector: 'ui-skill-list',
  imports: [MatSlideToggle, FormsModule, SkillSearchPipe, TagComponent],
  templateUrl: './skill-list.component.html',
  styleUrl: './skill-list.component.scss',
  standalone: true,
})
export class SkillListComponent {
  sortSkills: boolean = false;
  skills: Skill[] = [];

  // Filtered Arrays
  frontend: Skill[] = [];
  backend: Skill[] = [];
  general: Skill[] = [];
  other: Skill[] = [];
  searchInput: string = '';

  constructor(
    private server: ContentService,
    public dialog: MatDialog,
  ) {
    this.server.getDisplayedSkills().subscribe((skills) => {
      this.skills = skills;

      skills.forEach((item) => {
        switch (item.group) {
          case 'frontend':
            this.frontend.push(item);
            break;
          case 'backend':
            this.backend.push(item);
            break;
          case 'general':
            this.general.push(item);
            break;
          default:
            this.other.push(item);
        }
      });
    });
  }

  viewSkill(id: string) {
    this.dialog.open(SkillDialogComponent, {
      data: id,
      autoFocus: false,
      width: '100%',
      maxWidth: '600px',
    });
  }
}
