import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { ConversationSectionComponent } from './conversation-section/conversation-section.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat-section',
  imports: [
    ButtonComponentComponent,
    ConversationSectionComponent,
    MatIconModule,
  ],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSectionComponent {}
