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

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(30px)'}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({opacity: 1, transform: 'translateY(0)'}))
  ])
]);

export const fadeInDown = trigger('fadeInDown', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(-30px)'}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({opacity: 1, transform: 'translateY(0)'}))
  ])
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(-40px)'}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({opacity: 1, transform: 'translateX(0)'}))
  ])
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(40px)'}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({opacity: 1, transform: 'translateX(0)'}))
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
    style({opacity: 0, transform: 'scale(0.9)'}),
    animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({opacity: 1, transform: 'scale(1)'}))
  ])
]);

export const scaleInBounce = trigger('scaleInBounce', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0.5)'}),
    animate('700ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({opacity: 1, transform: 'scale(1)'}))
  ])
]);

export const heroPop = trigger('heroPop', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(10px) scale(.98)'}),
    animate('500ms 60ms cubic-bezier(.2,.8,.2,1)', style({opacity: 1, transform: 'none'}))
  ])
]);

export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({transform: 'translateX(-100%)', opacity: 0}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({transform: 'translateX(0)', opacity: 1}))
  ])
]);

export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({transform: 'translateX(100%)', opacity: 0}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({transform: 'translateX(0)', opacity: 1}))
  ])
]);

export const zoomIn = trigger('zoomIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'scale(0)'}),
    animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({opacity: 1, transform: 'scale(1)'}))
  ])
]);

export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'rotate(-180deg) scale(0.5)'}),
    animate('800ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({opacity: 1, transform: 'rotate(0) scale(1)'}))
  ])
]);

export const flipIn = trigger('flipIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'perspective(400px) rotateX(-90deg)'}),
    animate('600ms cubic-bezier(0.4, 0, 0.2, 1)', style({opacity: 1, transform: 'perspective(400px) rotateX(0)'}))
  ])
]);
