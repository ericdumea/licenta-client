import { TestBed } from '@angular/core/testing';

import { ProviderInsertService } from './provider-insert.service';

describe('ProviderInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderInsertService = TestBed.get(ProviderInsertService);
    expect(service).toBeTruthy();
  });
});
