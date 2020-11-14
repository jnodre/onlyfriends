import { TestBed } from '@angular/core/testing';

import { PatchuserService } from './patchuser.service';

describe('PatchuserService', () => {
  let service: PatchuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatchuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
