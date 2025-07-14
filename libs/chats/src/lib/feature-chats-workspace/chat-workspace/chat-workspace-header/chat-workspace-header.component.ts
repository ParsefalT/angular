import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'tt-app-chat-workspace-header',
  imports: [AvatarCircleComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
