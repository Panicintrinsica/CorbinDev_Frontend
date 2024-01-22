import {Component, Input} from '@angular/core';
import {Project} from "../../../../../corbin.dev - OLD AND BROKEN/src/app/models/project.model";

@Component({
  selector: 'ui-project',
  standalone: true,
  imports: [],
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
