import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile-interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl: string = 'https://718081c5976c31c6.mokky.dev';

  constructor() {}

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/users`);
  }
}
