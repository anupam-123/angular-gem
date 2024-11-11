import { Component } from '@angular/core';
import { MiddleChatSectionComponent } from './middle-chat-section/middle-chat-section.component';

@Component({
  selector: 'app-chat-section',
  standalone: true,
  imports: [MiddleChatSectionComponent],
  templateUrl: './chat-section.component.html',
  styleUrl: './chat-section.component.css'
})
export class ChatSectionComponent {

}
