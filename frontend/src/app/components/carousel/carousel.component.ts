import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition(
        ':increment',
        [
          animate(
            '{{duration}}ms {{easing}}',
            keyframes([
              style({ opacity: 0, transform: 'translateX(0)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
            ])
          ),
        ],
        { params: { duration: 700, easing: 'ease-in-out' } }
      ),
      transition(
        ':decrement',
        [
          animate(
            '{{duration}}ms {{easing}}',
            keyframes([
              style({ opacity: 0, transform: 'translateX(0)', offset: 0 }),
              style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
            ])
          ),
        ],
        { params: { duration: 700, easing: 'ease-in-out' } }
      ),
    ]),
  ],
})
export class CarouselComponent {
  @Input() transitionDuration = 500; // Default duration in ms
  @Input() transitionEasing = 'ease-in-out'; // Default easing function
  @Input() slides: { image: string; content: string }[] = []; // Array of slides with image and content

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
