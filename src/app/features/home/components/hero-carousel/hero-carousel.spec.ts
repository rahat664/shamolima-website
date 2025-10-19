import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCarousel } from './hero-carousel';

describe('HeroCarousel', () => {
  let component: HeroCarousel;
  let fixture: ComponentFixture<HeroCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCarousel]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 slides', () => {
    expect(component.slides.length).toBe(3);
  });

  it('should start at slide 0', () => {
    expect(component.currentSlide).toBe(0);
  });

  it('should navigate to next slide', () => {
    component.next();
    expect(component.currentSlide).toBe(1);
  });

  it('should navigate to previous slide', () => {
    component.prev();
    expect(component.currentSlide).toBe(2); // wraps around
  });

  it('should go to specific slide', () => {
    component.goToSlide(2);
    expect(component.currentSlide).toBe(2);
  });
});
