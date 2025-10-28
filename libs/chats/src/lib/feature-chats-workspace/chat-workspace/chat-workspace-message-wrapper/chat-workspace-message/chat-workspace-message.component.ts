import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AvatarCircleComponent, LuxonDatePipe } from '@tt/common-ui';
import { Message } from '../../../../data/index';
@Component({
  selector: 'tt-app-chat-workspace-message',
  imports: [AvatarCircleComponent, LuxonDatePipe],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.is-mine')
  get isMine() {
    return this.message().isMine;
  }
}
