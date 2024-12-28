import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

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
        .subscribe();
        this.router.navigate(['/']);
      }
  }
}
