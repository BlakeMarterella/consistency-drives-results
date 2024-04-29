import { TestBed } from '@angular/core/testing';

import { EntryTableService } from './entry-table.service';

describe('EntryTableService', () => {
  let service: EntryTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
