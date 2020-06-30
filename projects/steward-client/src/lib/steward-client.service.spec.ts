import { TestBed } from '@angular/core/testing';

import { StewardClientService } from './steward-client.service';

describe('StewardClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StewardClientService<any, any> = TestBed.get(StewardClientService);
    expect(service).toBeTruthy();
  });

  it('Authentication', () => {
    fail("Authentication tests still being implemented")
  })
});
