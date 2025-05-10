import { Routes } from '@angular/router';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { ExperimentalComponent } from '@tt/test';
import {
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'example', component: ExperimentalComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
];

type Color = 'red' | 'green' | 'blue';
type Test<T extends Color> = T extends Color ? T : number;
// type test<T> = T extends 'red' | "green" | "blue" ? T : number
const fn = (): string => "asd"
const name:Test<"green"> = "green"

type ts = ReturnType<typeof fn>

const l = {
  RED: "REDd",
  GREEN: "GREEN"
} as const

type o = typeof l[keyof typeof l]
const g:o = 'GREEN'