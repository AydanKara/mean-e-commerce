import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const sliderNewProductsAnimation = trigger('sliderAnimation', [
  state('active', style({ opacity: 1, transform: 'translateX(0)' })),
  state('inactive', style({ opacity: 0, transform: 'translateX(-100%)' })),
  transition('inactive => active', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('500ms ease-out'),
  ]),
  transition('active => inactive', [
    animate(
      '500ms ease-in',
      style({ transform: 'translateX(-100%)', opacity: 0 })
    ),
  ]),
]);

export const sliderHeroAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate(
      '500ms ease-out',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);
