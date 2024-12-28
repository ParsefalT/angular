import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseApiUrl: string = 'https://icherniakov.ru/yt-course';

  http = inject(HttpClient);

  constructor() {}

  getAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`);
  }
}
