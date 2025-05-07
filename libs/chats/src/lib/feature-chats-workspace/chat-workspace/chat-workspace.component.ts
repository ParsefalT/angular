import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessageWrapperComponent } from './chat-workspace-message-wrapper/chat-workspace-message-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Chat, ChatsService } from '../../data';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'tt-app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessageWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activateChat$ = this.route.params.pipe(
    switchMap(({ id }) => {
      console.log(id);
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            console.log(userId);
            return this.chatsService.createChat(userId).pipe(
              switchMap((chat) => {
                this.router.navigate(['chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }
      return this.chatsService.getChatById(id);
    })
  );
}
