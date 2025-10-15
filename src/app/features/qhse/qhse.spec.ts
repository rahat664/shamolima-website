import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qhse } from './qhse';

describe('Qhse', () => {
  let component: Qhse;
  let fixture: ComponentFixture<Qhse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Qhse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Qhse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
