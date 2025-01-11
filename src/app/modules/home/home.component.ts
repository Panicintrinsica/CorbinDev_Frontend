import { Component, inject, OnInit } from '@angular/core';
import { ServerService } from '../../services/server.service';
import { HomeKeyartComponent } from './home-keyart/home-keyart.component';
import {
  featuredStackItem,
  HomeFeatureComponent,
} from './home-feature/home-feature.component';
import { getContentBody } from '../../utilities';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  imports: [HomeKeyartComponent, HomeFeatureComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  protected readonly getContentBody = getContentBody;

  server = inject(ServerService);

  content = this.server.content;

  frontendFeatures: featuredStackItem[] = [
    // {
    //   img: 'html',
    //   alt: 'HTML',
    //   link: 'https://www.w3.org/TR/2011/WD-html5-20110405/',
    // },
    // {
    //   img: 'css',
    //   alt: 'css',
    //   link: 'https://www.w3.org/Style/CSS/specs.en.html',
    // },
    {
      img: 'js',
      alt: 'JavaScript',
      link: 'https://ecma-international.org/publications-and-standards/standards/ecma-262/',
    },
    {
      img: 'typescript',
      alt: 'TypeScript',
      link: 'https://www.typescriptlang.org/',
    },
    { img: 'angular', alt: 'Angular', link: 'https://angular.dev' },
    {
      img: 'react',
      alt: 'react.js',
      link: 'https://www.react.dev/',
    },
    {
      img: 'electron',
      alt: 'Electron.js',
      link: 'https://www.electronjs.org/',
    },
    // { img: 'tauri', alt: 'Tauri', link: 'https://v2.tauri.app/' },
  ];
  backendFeatures: featuredStackItem[] = [
    { img: 'gcloud', alt: 'Google Cloud', link: 'https://cloud.google.com/' },
    { img: 'node-js', alt: 'Node.js', link: 'https://nodejs.org/en' },
    { img: 'mongodb', alt: 'MongoDB', link: 'https://www.mongodb.com/' },
    { img: 'mysql', alt: 'MySQL', link: 'https://www.mysql.com/' },
    // {
    //   img: 'PostgreSQL',
    //   alt: 'PostgreSQL',
    //   link: 'https://www.postgresql.org/',
    // },
    // { img: 'bun', alt: 'bun', link: 'https://bun.sh/' },
    // { img: 'xata', alt: 'Xata.io', link: 'https://xata.io/' },
    { img: 'redis', alt: 'Redis', link: 'https://redis.io/' },
  ];
  otherFeatures: featuredStackItem[] = [
    { img: 'java', alt: 'jana', link: 'https://www.oracle.com/java/' },
    { img: 'kotlin', alt: 'Kotlin', link: 'https://kotlinlang.org/' },
    { img: 'rust', alt: 'Rust', link: 'https://www.rust-lang.org/' },
    { img: 'cpp', alt: 'C++', link: 'https://isocpp.org/' },
    {
      img: 'android',
      alt: 'Android',
      link: 'https://developer.android.com/studio',
    },
    // {
    //   img: 'unreal',
    //   alt: 'Unreal Engine',
    //   link: 'https://www.unrealengine.com',
    // },
  ];

  constructor(
    private meta: Meta,
    private title: Title,
  ) {
    this.title.setTitle('Corbin.dev');

    this.meta.addTags([
      {
        name: 'description',
        content: 'Portfolio & Website of Emrys Corbin, Software Engineer.',
      },
      {
        name: 'keywords',
        content: 'emrys, corbin, corbin.dev, software engineer',
      },
    ]);
  }

  ngOnInit(): void {
    this.server.fetchContent('landing');
  }
}
