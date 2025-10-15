import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkActivities } from './work-activities';

describe('WorkActivities', () => {
  let component: WorkActivities;
  let fixture: ComponentFixture<WorkActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkActivities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkActivities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
