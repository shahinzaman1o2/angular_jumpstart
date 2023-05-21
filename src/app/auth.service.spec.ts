import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set login status', () => {
    const status = true;
    service.setLoginStatus(status);
    service.getLoginStatus().subscribe((loginStatus) => {
      expect(loginStatus).toEqual(status);
    });
  });
});
