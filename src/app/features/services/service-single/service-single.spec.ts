import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSingle } from './service-single';

describe('ServiceSingle', () => {
  let component: ServiceSingle;
  let fixture: ComponentFixture<ServiceSingle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSingle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceSingle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
