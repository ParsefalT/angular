import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

interface IForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup<IForm>({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  isPasswordVisible = signal<boolean>(false);

  onSubmit() {
    if (!this.form.valid) {
      console.log('not valid');
      return;
    }
    this.authService
      //@ts-ignore
      .login(this.form.value)
      .subscribe((res) => this.router.navigate(['']));
  }
}
