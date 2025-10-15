import {animate, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const routeFade = trigger('routeFade', [
  transition(':enter', [
    style({opacity: 0}),
    animate('350ms ease-out', style({opacity: 1}))
  ])
]);

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(8px)'}),
    animate('400ms 80ms ease-out', style({opacity: 1, transform: 'none'}))
  ])
]);

export const listStagger = trigger('listStagger', [
  transition(':enter', [
    query('.stagger-item', [
      style({opacity: 0, transform: 'translateY(10px)'}),
      stagger(80, animate('400ms ease-out', style({opacity: 1, transform: 'none'})))
    ], {optional: true})
  ])
]);

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(.96)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'scale(1)'}))
  ])
]);

export const heroPop = trigger('heroPop', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(10px) scale(.98)'}),
    animate('500ms 60ms cubic-bezier(.2,.8,.2,1)', style({opacity: 1, transform: 'none'}))
  ])
]);
