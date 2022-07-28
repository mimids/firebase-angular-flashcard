import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { environment } from '../..//environments/environment';
import { Account, Upload } from '../core/models/user.model';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly accountKey = 'account';
  private readonly jwtKey = 'jwt';
  private readonly accountSubject$ = new ReplaySubject<Account | undefined>(1);
  account$ = this.accountSubject$.asObservable();
  userUid='';
  jwt: string | undefined;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly http: HttpClient,
  ) {
    const account = this.localStorageService.getItemInStorage(
      this.accountKey,
    ) as Account | undefined;
    this.accountSubject$.next(account);
    const jwt = this.localStorageService.getItemInStorage(this.jwtKey) as
      | string
      | undefined;
    this.jwt = jwt;
  }

  update(account: Account, jwt?: string): Account {
    this.localStorageService.setItemInStorage(this.accountKey, account);
    
    this.accountSubject$.next(account);

    if (jwt !== undefined) {
      this.localStorageService.setItemInStorage(this.jwtKey, jwt);
      this.jwt = jwt;
    }
    return account;
  }

  delete(): void {
    this.localStorageService.removeItemInStorage(this.accountKey);
    this.accountSubject$.next(undefined);
    this.localStorageService.removeItemInStorage(this.jwtKey);
    this.jwt = undefined;
    this.router.navigate(['home']);
  }

  updateAvatar$(formData: FormData): Observable<Upload | undefined> {
    return this.account$.pipe(
      take(1),
      switchMap((account) =>
        account !== undefined
          ? this.http.post<Upload>(
              `${environment.apiUrl}/accounts/${account.uid}/avatar`,
              formData,
            )
          : of(undefined),
      ),
    );
  }
}
