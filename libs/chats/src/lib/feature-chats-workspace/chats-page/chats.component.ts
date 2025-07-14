import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListsComponent } from '../chats-lists/chats-lists.component';

@Component({
  selector: 'tt-app-chats',
  imports: [RouterOutlet, ChatsListsComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsPageComponent {}
