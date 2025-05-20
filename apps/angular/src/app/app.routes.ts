import { Routes } from '@angular/router';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { ExperimentalComponent } from '@tt/test';
import {
  ProfileEffects,
  profileFeature,
  ProfilePageComponent,
  // ProfileState,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { provideStates } from '@ngxs/store';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent, providers: [
        // provideStates([ProfileState]),
        provideState(profileFeature),
        provideEffects(ProfileEffects)
      ] },
      { path: 'example', component: ExperimentalComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];
