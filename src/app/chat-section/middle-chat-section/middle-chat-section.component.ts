import { Component } from '@angular/core';
import { ButtonComponentComponent } from './button-component/button-component.component';
import { ConversationSectionComponent } from './conversation-section/conversation-section.component';

@Component({
  selector: 'app-middle-chat-section',
  standalone: true,
  imports: [ButtonComponentComponent, ConversationSectionComponent],
  templateUrl: './middle-chat-section.component.html',
  styleUrl: './middle-chat-section.component.css'
})
export class MiddleChatSectionComponent {

}
