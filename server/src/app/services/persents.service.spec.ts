import { TestBed } from '@angular/core/testing';

import { PersentsService } from './persents.service';

describe('PersentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersentsService = TestBed.get(PersentsService);
    expect(service).toBeTruthy();
  });
});
