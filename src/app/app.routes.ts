import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { catActivateAuth } from './auth/access-guard';
import { SettingPageComponent } from './pages/setting-page/setting-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingPageComponent },
    ],
    canActivate: [catActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
