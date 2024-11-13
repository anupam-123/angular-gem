import { TestBed } from '@angular/core/testing';

import { ChatSectionService } from './chat-section.service';

describe('ChatSectionService', () => {
  let service: ChatSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
