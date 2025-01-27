import { TestBed } from '@angular/core/testing';

import { LocalStorageAngService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageAngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageAngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
