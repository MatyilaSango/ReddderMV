import { TestBed } from '@angular/core/testing';

import { SearchComponentService } from './search-component.service';

describe('SearchComponentService', () => {
  let service: SearchComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
