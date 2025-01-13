import { Component, input } from '@angular/core';
import { MatAnchor, MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { ProjectCard } from '../../../../models/project.model';
import { TagComponent } from '../../../ui/ui-tag/tag.component';

@Component({
  selector: 'app-project-card',
  imports: [
    MatAnchor,
    MatButton,
    RouterLink,
    TitleCasePipe,
    TagComponent,
    NgOptimizedImage,
  ],
  templateUrl: './project-card.component.html',
  standalone: true,
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  project = input<ProjectCard>({
    blurb: '',
    category: '',
    isFeatured: false,
    isPublished: false,
    link: '',
    linkType: '',
    name: '',
    platform: '',
    thumbnail: '',
    uri: '',
  });
}
