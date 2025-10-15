import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteWidget } from './quote-widget';

describe('QuoteWidget', () => {
  let component: QuoteWidget;
  let fixture: ComponentFixture<QuoteWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
