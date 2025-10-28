import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'error',
  imports: [],
  template: `
    <span class="error">Not Found - 404</span>
    <a href="/" style="color:orange;">Go home</a>
  `,
  styles: `
    :host {
        display: grid;
        place-items: center;
        height: 100dvh;
    }

    .error {
        font-size: 150px;
        font-weight: bold;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
