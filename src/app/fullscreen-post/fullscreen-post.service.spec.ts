import { TestBed } from '@angular/core/testing';

import { FullscreenPostService } from './fullscreen-post.service';

describe('FullscreenPostService', () => {
  let service: FullscreenPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
