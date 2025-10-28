import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListsComponent } from '../chats-lists/chats-lists.component';
import { ChatsService } from '../../data';

@Component({
  selector: 'tt-app-chats',
  imports: [RouterOutlet, ChatsListsComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsPageComponent implements OnInit {
  #chatService = inject(ChatsService);

  ngOnInit(): void {
    this.#chatService.connectWs()
  }
}
