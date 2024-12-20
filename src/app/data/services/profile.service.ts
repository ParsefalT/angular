import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile-interface';
import { map, tap } from 'rxjs';
import { Pageble } from '../interfaces/pagebel.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl: string = 'https://icherniakov.ru/yt-course';
  me = signal<Profile | null>(null);

  filteredProfiles = signal<Profile[]>([])
  constructor() {}

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}/account/test_accounts`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/${id}`);
  }

  getSubscribers(amount: number = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}/account/subscribers/`)
      .pipe(map((res) => res.items.slice(0, amount)));
  }

  pathProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}/account/me`, profile);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}/account/me`).pipe(
      tap((res) => {
        this.me.set(res);
      })
    );
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.http.post<Profile>(
      `${this.baseApiUrl}/account/upload_image`,
      fd
    );
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.baseApiUrl}/account/accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfiles.set(res.items)));
  }
}
