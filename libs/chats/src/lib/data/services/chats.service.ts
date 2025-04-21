import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat, LastChatResponse, Message } from '../interfaces/chats.interface';
import { map } from 'rxjs';
import { ProfileService } from '@tt/profile';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  http = inject(HttpClient);
  meProfileService = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';
  chatsUrl = `${this.baseApiUrl}chat/`;
  messageUrl = `${this.baseApiUrl}message/`;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastChatResponse[]>(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.meProfileService()?.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          companion:
            chat.userFirst.id == this.meProfileService()?.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
