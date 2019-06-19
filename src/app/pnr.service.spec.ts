import { TestBed } from '@angular/core/testing';

import { PnrService } from './pnr.service';

describe('PnrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PnrService = TestBed.get(PnrService);
    expect(service).toBeTruthy();
  });
});
