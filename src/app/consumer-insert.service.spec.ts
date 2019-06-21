import { TestBed } from '@angular/core/testing';

import { ConsumerInsertService } from './consumer-insert.service';

describe('ConsumerInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumerInsertService = TestBed.get(ConsumerInsertService);
    expect(service).toBeTruthy();
  });
});
