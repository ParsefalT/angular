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
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  baseApiUrl: string = 'https://icherniakov.ru/yt-course/auth/';
  token: string | null = null;
  refresh_token: string | null = null;

  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
      this.refresh_token = this.cookieService.get('refresh_token');
    }
    return !!this.token;
  }

  constructor() {}

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}token`, fd)
      .pipe(tap((val) => this.saveTokens(val)));
  }

  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refresh_token = null;
    this.router.navigate(['/login']);
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refresh_token: this.refresh_token,
      })
      .pipe(
        tap((res) => {}),
        catchError((err) => {
          this.logout();
          return throwError(err);
        })
      );
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refresh_token = res.refresh_token;

    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refresh_token);
  }
}
