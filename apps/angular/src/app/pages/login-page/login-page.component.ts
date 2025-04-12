import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
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
        .subscribe((res) => {
          this.router.navigate(['/']);
        });
    }
  }
}
