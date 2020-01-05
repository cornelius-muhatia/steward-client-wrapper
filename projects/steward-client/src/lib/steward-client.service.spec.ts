import { TestBed } from '@angular/core/testing';

import { StewardClientService } from './steward-client.service';

describe('StewardClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StewardClientService = TestBed.get(StewardClientService);
    expect(service).toBeTruthy();
  });
});
