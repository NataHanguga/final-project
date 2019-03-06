import { TestBed } from '@angular/core/testing';

import { StartPropertyService } from './start-property.service';

describe('StartPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartPropertyService = TestBed.get(StartPropertyService);
    expect(service).toBeTruthy();
  });
});
