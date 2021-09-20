import { TestBed } from '@angular/core/testing';
import { Mock } from 'ts-mocks';

import { AuthenticationService } from './authentication.service';
import { DataAccessService } from './data-access.service';

describe('DataAccessService', () => {
  let service: DataAccessService;
  const mockAuth = new Mock<AuthenticationService>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationService, useValue: mockAuth.Object }],
    });
    service = TestBed.inject(DataAccessService);
  });

  beforeEach(() => {
    mockAuth.extend({ currentUser: () => Promise.resolve('mock@test.org') });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return orders', async () => {
    const orders = await service.orderList();
    expect(Array.isArray(orders)).toBeTrue();
  });

  it('should be return order items', async () => {
    const items = await service.orderDetails('1');
    expect(Array.isArray(items)).toBeTrue();
  });
});
