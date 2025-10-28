import {
  ChatConnectionWSParams,
  ChatWsService,
} from '../interfaces/chat-ws-service-interface';

export class ChatWsNativeService implements ChatWsService {
  #socket: WebSocket | null = null;

  connect(params: ChatConnectionWSParams) {
    if (this.#socket) return;

    this.#socket = new WebSocket(params.url, [params.token]);

    this.#socket.onmessage = (event: MessageEvent) => {
      params.handleWSMessage(JSON.parse(event.data));
    };

    this.#socket.onclose = () => {
      console.log(`А что вы тут делаете? Уже все закрыто - CLOSE`);
    };
  }

  sendMessage(text: string, chatId: number) {
    this.#socket?.send(
      JSON.stringify({
        text,
        chat_id: chatId,
      } satisfies { text: string; chat_id: number })
    );
  }

  disconnect() {
    this.#socket?.close();
  }
}
