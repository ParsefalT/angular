import { Component, ElementRef, inject, input } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { firstValueFrom } from 'rxjs';
import { MessageInputComponent } from '@tt/common-ui';
import { Chat, ChatsService } from '../../../data';

@Component({
  selector: 'tt-app-chat-workspace-message-wrapper',
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-message-wrapper.component.html',
  styleUrl: './chat-workspace-message-wrapper.component.scss',
})
export class ChatWorkspaceMessageWrapperComponent {
  chatsService = inject(ChatsService);
  chat = input.required<Chat>();

  messages = this.chatsService.activeChatMessages;
  ref = inject(ElementRef);
  // ngOnInit() {
  //   this.messages.set(this.chat().messages);
  // }
  ngAfterViewChecked() {
    this.ref.nativeElement.scroll(0, this.ref.nativeElement.scrollHeight);
  }

  async onSendMessage(messageText: string) {
    await firstValueFrom(
      this.chatsService.sendMessage(this.chat().id, messageText)
    );
    await firstValueFrom(this.chatsService.getChatById(this.chat().id));

    setTimeout(() => {
      this.ref.nativeElement.scroll(0, this.ref.nativeElement.scrollHeight);
    });
  }
}
