import {
  transition,
  trigger,
  query,
  style,
  animate,
  group
} from '@angular/animations';


const transitionSpeed = '0.2s';

const SlideLeft = [
  query(':enter, :leave',
    style({ position: 'fixed', width: '100%' }),
    { optional: true }),
  group([
    query(':enter', [
      style({ transform: 'translateX(-100%)', opacity: '0%', filter: 'blur(1rem)'  }),
      animate(`${transitionSpeed} ease-in-out`,
        style({ transform: 'translateX(0%)', opacity: '100%', filter: 'blur(0)'  }))
    ], { optional: true }),
    query(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate(`${transitionSpeed} ease-in-out`,
        style({ transform: 'translateX(100%)' }))
    ], { optional: true }),
  ])
]
const SlideRight = [
  query(':enter, :leave',
    style({ position: 'fixed',  width: '100%'}),
    { optional: true }),
  group([
    query(':enter', [
      style({ transform: 'translateX(100%)', opacity: '0%', filter: 'blur(1rem)' }),
      animate(`${transitionSpeed} ease-in-out`,
        style({ transform: 'translateX(0%)', opacity: '100%', filter: 'blur(0)' }))
    ], { optional: true }),
    query(':leave', [
      style({ transform: 'translateX(0%)' }),
      animate(`${transitionSpeed} ease-in-out`,
        style({ transform: 'translateX(-100%)' }))
    ], { optional: true }),
  ])
]
const CrossFade = [
  query(':enter, :leave',
    style({ position: 'fixed',  width: '100%'}),
    { optional: true }),
  group([

    query(':leave', [
      style({ opacity: '100%'}),
      animate(`${transitionSpeed} ease-in-out`,
        style({ opacity: '0%' }))
    ], { optional: true }),

    query(':enter', [
      style({ opacity: '0%', filter: 'blur(0.25rem)' }),
      animate('.33s ease-in-out',
        style({ opacity: '100%', filter: 'blur(0)' }))
    ], { optional: true })
  ])
]


export const slideInAnimation =
  trigger('routeAnimations', [

    transition('cv => *', SlideRight),
    transition('* => cv', SlideLeft),

    transition('Projects <=> Project', CrossFade),
    transition('Blog <=> Article', CrossFade),
    transition('Projects => Blog', SlideLeft),

    transition('* => Home', SlideLeft),
    transition('Home => *', SlideRight),

    transition('Blog => *', SlideRight),

    transition('Bio => *', SlideLeft),
    transition('* => Bio', SlideRight),

  ]);


