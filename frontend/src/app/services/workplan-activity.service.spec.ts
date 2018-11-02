import { TestBed } from '@angular/core/testing';

import { WorkplanActivityService } from './workplan-activity.service';

describe('WorkplanActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkplanActivityService = TestBed.get(WorkplanActivityService);
    expect(service).toBeTruthy();
  });
});
