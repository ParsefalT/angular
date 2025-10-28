import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'tt-app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isTelegaVisible = signal<boolean>(true);
  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string | null>('', Validators.required),
    password: new FormControl<string | null>('', Validators.required),
  });

  onSubmit() {
    if (
      (this.form.valid && this.form.value.password !== '') ||
      this.form.value.password!.trim() !== ''
    ) {
      this.authService
        .login(this.form.value as { username: string; password: string })
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
