import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-data-access',
  imports: [CommonModule],
  templateUrl: './data-access.component.html',
  styleUrl: './data-access.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccessComponent {}
