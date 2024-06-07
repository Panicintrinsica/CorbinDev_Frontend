import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

const fadeInSlow =[
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('1s', style({ opacity: 1 }))
          ])
        ], { optional: true })
    ]

const fadeInFast =[
  query(':enter', [
    style({ opacity: 0 }),
    stagger(50, [
      animate('500ms', style({ opacity: 1 }))
    ])
  ], { optional: true })
]

export const ProjectListAnim =
  trigger('FadeInList', [
    transition('* => *', fadeInSlow)
]);

export const SkillListAnim =
  trigger('FadeInList', [
    transition('* => *', fadeInFast)
  ]);
