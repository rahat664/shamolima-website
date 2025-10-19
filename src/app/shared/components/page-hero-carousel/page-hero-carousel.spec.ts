import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeroCarousel } from './page-hero-carousel';

describe('PageHeroCarousel', () => {
  let component: PageHeroCarousel;
  let fixture: ComponentFixture<PageHeroCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeroCarousel]
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeroCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
