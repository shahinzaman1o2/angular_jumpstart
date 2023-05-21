import { TestBed } from '@angular/core/testing';

import { ChangestateService } from './changestate.service';

describe('ChangestateService', () => {
  let service: ChangestateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangestateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state as "Initial State"', () => {
    service.currentMessage$.subscribe((message: string) => {
      expect(message).toBe('Initial State');
    });
  });

  it('should change the state when calling changeState()', () => {
    const newState = 'New State';
    service.changeState(newState);
    service.currentMessage$.subscribe((message: string) => {
      expect(message).toBe(newState);
    });
  });
});
