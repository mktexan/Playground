import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in joe', async () => {
    const statusBefore = await service.currentUser();
    expect(statusBefore).toBeUndefined();
    const loginResult = await service.login('joe@test.com', '12345');
    expect(loginResult).toEqual(true);
    const statusAfter = await service.currentUser();
    expect(statusAfter).toEqual('joe@test.com');
  });

  it('should not log in tom', async () => {
    const statusBefore = await service.currentUser();
    expect(statusBefore).toBeUndefined();
    const loginResult = await service.login('tom@test.com', '12345');
    expect(loginResult).toEqual(false);
  });
});
