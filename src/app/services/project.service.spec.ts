import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { Project } from '../models/project.model';
import { ProjectService } from './project.service';
import { environment } from '../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  let API = environment.API;

  const dummyProjects: Project[] = [
    {
      id: '1',
      name: 'Project One',
      shortDescription: 'Short description for project one',
      longDescription: 'Long description for project one',
      client: 'Client One',
      role: 'Developer',
      started: 2020,
      ended: 2021,
      skills: ['Angular', 'TypeScript'],
      link: 'http://example.com/project-one',
      thumbnail: {
        name: 'thumbnail-one.jpg',
        mediaType: 'image/jpeg',
        enablePublicUrl: true,
        singedUrlTimeout: 3600,
        uploadUrlTimeout: 600,
        size: 1024,
        version: 1,
        url: 'http://example.com/thumbnail-one.jpg',
      },
      category: 'Web Development',
      group: 'Internal',
      showLink: true,
      isCurrent: false,
      hasNotes: true,
      isFeatured: false,
      isPublic: true,
      slug: 'project-one',
      xata: {
        createdAt: '2020-01-01T00:00:00Z',
        updatedAt: '2020-01-01T00:00:00Z',
        version: 1,
      },
    },
    {
      id: '2',
      name: 'Project Two',
      shortDescription: 'Short description for project two',
      longDescription: 'Long description for project two',
      client: 'Client Two',
      role: 'Tester',
      started: 2021,
      ended: 2022,
      skills: ['Jasmine', 'Karma'],
      link: 'http://example.com/project-two',
      thumbnail: {
        name: 'thumbnail-two.jpg',
        mediaType: 'image/jpeg',
        enablePublicUrl: true,
        singedUrlTimeout: 3600,
        uploadUrlTimeout: 600,
        size: 1024,
        version: 1,
        url: 'http://example.com/thumbnail-two.jpg',
      },
      category: 'Quality Assurance',
      group: 'External',
      showLink: true,
      isCurrent: false,
      hasNotes: false,
      isFeatured: true,
      isPublic: true,
      slug: 'project-two',
      xata: {
        createdAt: '2021-02-01T00:00:00Z',
        updatedAt: '2021-02-01T00:00:00Z',
        version: 1,
      },
    },
    {
      id: '3',
      name: 'Project Three',
      shortDescription: 'Short description for project three',
      longDescription: 'Long description for project three',
      client: 'Client Three',
      role: 'Manager',
      started: 2019,
      ended: 2020,
      skills: ['Management', 'Scrum'],
      link: 'http://example.com/project-three',
      thumbnail: {
        name: 'thumbnail-three.jpg',
        mediaType: 'image/jpeg',
        enablePublicUrl: true,
        singedUrlTimeout: 3600,
        uploadUrlTimeout: 600,
        size: 2048,
        version: 1,
        url: 'http://example.com/thumbnail-three.jpg',
      },
      category: 'Management',
      group: 'Internal',
      showLink: true,
      isCurrent: false,
      hasNotes: true,
      isFeatured: true,
      isPublic: false,
      slug: 'project-three',
      xata: {
        createdAt: '2019-03-01T00:00:00Z',
        updatedAt: '2019-03-01T00:00:00Z',
        version: 1,
      },
    },
    {
      id: '4',
      name: 'Project Four',
      shortDescription: 'Short description for project four',
      longDescription: 'Long description for project four',
      client: 'Client Four',
      role: 'Designer',
      started: 2022,
      ended: 2023,
      skills: ['Photoshop', 'Illustrator'],
      link: 'http://example.com/project-four',
      thumbnail: {
        name: 'thumbnail-four.jpg',
        mediaType: 'image/jpeg',
        enablePublicUrl: true,
        singedUrlTimeout: 3600,
        uploadUrlTimeout: 600,
        size: 512,
        version: 1,
        url: 'http://example.com/thumbnail-four.jpg',
      },
      category: 'Design',
      group: 'Client',
      showLink: false,
      isCurrent: true,
      hasNotes: false,
      isFeatured: false,
      isPublic: true,
      slug: 'project-four',
      xata: {
        createdAt: '2022-04-01T00:00:00Z',
        updatedAt: '2022-04-01T00:00:00Z',
        version: 1,
      },
    },
    {
      id: '5',
      name: 'Project Five',
      shortDescription: 'Short description for project five',
      longDescription: 'Long description for project five',
      client: 'Client Five',
      role: 'Marketing',
      started: 2018,
      ended: 2019,
      skills: ['SEO', 'Content Marketing'],
      link: 'http://example.com/project-five',
      thumbnail: {
        name: 'thumbnail-five.jpg',
        mediaType: 'image/jpeg',
        enablePublicUrl: true,
        singedUrlTimeout: 3600,
        uploadUrlTimeout: 600,
        size: 1024,
        version: 1,
        url: 'http://example.com/thumbnail-five.jpg',
      },
      category: 'Marketing',
      group: 'External',
      showLink: true,
      isCurrent: true,
      hasNotes: false,
      isFeatured: true,
      isPublic: false,
      slug: 'project-five',
      xata: {
        createdAt: '2018-05-01T00:00:00Z',
        updatedAt: '2018-05-01T00:00:00Z',
        version: 1,
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    const httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve projects by IDs', () => {
    service.getProjectsByIDs(['1', '2']).subscribe((projects: Project[]) => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(dummyProjects);
    });

    const req = httpMock.expectOne(`${API}/projects/forCV`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyProjects);
  });
});
