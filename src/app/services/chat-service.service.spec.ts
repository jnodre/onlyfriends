import { TestBed } from '@angular/core/testing';

import { ChatServideService } from './chat-service.service';

describe('ChatServideService', () => {
  let service: ChatServideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatServideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
