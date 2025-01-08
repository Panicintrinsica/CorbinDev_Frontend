import { Component, Input } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { Project } from '../../../../models/project.model';
import { TagComponent } from '../../../ui/ui-tag/tag.component';

@Component({
  selector: 'app-project-card',
  imports: [
    MatAnchor,
    MatButton,
    RouterLink,
    NgOptimizedImage,
    TitleCasePipe,
    TagComponent,
  ],
  templateUrl: './project-card.component.html',
  standalone: true,
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project: Project = {
    group: '',
    isFeatured: false,
    isPublic: false,
    link: '',
    role: '',
    thumbnail: {
      enablePublicUrl: false,
      mediaType: '',
      name: '',
      singedUrlTimeout: 0,
      size: 0,
      uploadUrlTimeout: 0,
      url: '',
      version: 0,
    },
    xata: { createdAt: '', updatedAt: '', version: 0 },
    id: '',
    category: '',
    client: '',
    started: 0,
    ended: 0,
    hasNotes: false,
    showLink: false,
    isCurrent: false,
    longDescription: '',
    name: '',
    shortDescription: '',
    skills: [],
    slug: '',
  };
}
