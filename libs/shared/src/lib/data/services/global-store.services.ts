import { Injectable, signal } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  me = signal<Profile | null>(null);
}
