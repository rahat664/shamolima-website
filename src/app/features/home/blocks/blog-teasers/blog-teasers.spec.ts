import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogTeasers } from './blog-teasers';

describe('BlogTeasers', () => {
  let component: BlogTeasers;
  let fixture: ComponentFixture<BlogTeasers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogTeasers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogTeasers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
