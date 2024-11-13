import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MessageService } from '../message.service';
import { GeminiService } from '../../gemini.service';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-conversation-section',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './conversation-section.component.html',
  styleUrl: './conversation-section.component.css',
})
export class ConversationSectionComponent implements OnInit {
  messages: string[] = [];

  constructor(private getMessageHistory: GeminiService) {}

  chatHistory: any[] = [];
  ngOnInit(): void {
    this.getMessageHistory.getMessageHistory().subscribe((data) => {
      if (data) this.chatHistory.push(data);
    });
  }
}
