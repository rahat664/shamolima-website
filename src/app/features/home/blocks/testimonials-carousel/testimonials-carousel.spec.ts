import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsCarousel } from './testimonials-carousel';

describe('TestimonialsCarousel', () => {
  let component: TestimonialsCarousel;
  let fixture: ComponentFixture<TestimonialsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
