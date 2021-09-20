// YOU CAN NOT CHANGE THIS FILE

import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { delay, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly internalStatus$ = new BehaviorSubject<string | undefined>(undefined);

  constructor() {}

  async currentUser(): Promise<string | undefined> {
    return this.internalStatus$.pipe(take(1)).toPromise();
  }

  async login(username: string, password: string) {
    return of([username, password])
      .pipe(
        delay(2000),
        map(([username, password]) => {
          const success = username?.toLowerCase() === 'joe@test.com' && password === '12345';
          this.internalStatus$.next(success ? username : undefined);
          return success;
        })
      )
      .toPromise();
  }
}
