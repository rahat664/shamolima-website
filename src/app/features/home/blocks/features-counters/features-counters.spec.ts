import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesCounters } from './features-counters';

describe('FeaturesCounters', () => {
  let component: FeaturesCounters;
  let fixture: ComponentFixture<FeaturesCounters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesCounters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesCounters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
