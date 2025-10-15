import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryTabs } from './gallery-tabs';

describe('GalleryTabs', () => {
  let component: GalleryTabs;
  let fixture: ComponentFixture<GalleryTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryTabs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
