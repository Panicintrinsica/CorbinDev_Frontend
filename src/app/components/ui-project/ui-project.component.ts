import {Component, Input} from '@angular/core';
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {Project} from "../../models/project.model";

@Component({
  selector: 'ui-project',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    RouterLink,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './ui-project.component.html',
  styleUrl: './ui-project.component.scss'
})
export class UiProjectComponent {
  @Input() project: Project = {
    _id: "",
    category: "",
    company: "",
    endDate: 0,
    features: "",
    hasDetails: false,
    hasLink: false,
    isCurrent: false,
    longDescription: "",
    name: "",
    photo: "",
    shortDescription: "",
    skills: [{name: "", _id: ""}],
    stack: "",
    startDate: 0,
    slug: "",
    title: "",
    type: "",
    url: "",
    published: false,
  }


}
