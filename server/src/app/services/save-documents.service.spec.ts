import { TestBed } from '@angular/core/testing';

import { SaveDocumentsService } from './save-documents.service';

describe('SaveDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveDocumentsService = TestBed.get(SaveDocumentsService);
    expect(service).toBeTruthy();
  });
});
