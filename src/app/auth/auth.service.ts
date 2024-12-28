import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string = 'https://icherniakov.ru/yt-course';
  http = inject(HttpClient);
  router = inject(Router);
  cookieService = inject(CookieService);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refreshToken = this.cookieService.get('refreshToken');
    }

    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    let fd = new FormData();
    fd.set('username', payload.username);
    fd.set('password', payload.password);
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/auth/token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/auth/refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => {
          this.saveTokens(val);
        }),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(val: TokenResponse) {
    this.token = val.access_token;
    this.refreshToken = val.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
