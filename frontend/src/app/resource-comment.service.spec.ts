import { TestBed } from '@angular/core/testing';

import { ResourceCommentService } from './resource-comment.service';

describe('ResourceCommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceCommentService = TestBed.get(ResourceCommentService);
    expect(service).toBeTruthy();
  });
});
