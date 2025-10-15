import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceStrip } from './service-strip';

describe('ServiceStrip', () => {
  let component: ServiceStrip;
  let fixture: ComponentFixture<ServiceStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceStrip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceStrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
