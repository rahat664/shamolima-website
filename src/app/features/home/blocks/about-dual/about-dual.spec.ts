import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDual } from './about-dual';

describe('AboutDual', () => {
  let component: AboutDual;
  let fixture: ComponentFixture<AboutDual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
