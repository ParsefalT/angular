export interface ChatConnectionWSParams {
  url: string;
  token: string;
  handleWSMessage: (message: unknown) => void;
}

export interface ChatWsService {
  connect: (params: ChatConnectionWSParams) => void;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
