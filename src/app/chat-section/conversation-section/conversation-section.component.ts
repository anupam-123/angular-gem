import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../gemini.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-conversation-section',
    imports: [MatIconModule, CommonModule],
    templateUrl: './conversation-section.component.html',
    styleUrls: ['./conversation-section.component.css']
})
export class ConversationSectionComponent implements OnInit {
  chatHistory: { from: string; message: string }[] = [];

  constructor(
    private fileService: FileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fileService.getMessageHistory().subscribe((data) => {
      console.log('data', data);
      if (data && data.length > 0) {
        // Clear chat history to avoid duplicates

        this.chatHistory = [];
        // Map the data to the desired format
        data.forEach((messageResponse) => {
          console.log(messageResponse);
          console.log(
            'messageResponse',
            messageResponse.prompt,
            'AiResponse',
            messageResponse
          );

          // Add user's prompt to chat history
          if (messageResponse.prompt) {
            this.chatHistory.push({
              from: 'user',
              message: messageResponse.prompt,
            });
          }

          // Add AI's response to chat history
          if (messageResponse && messageResponse.current) {
            this.chatHistory.push({
              from: 'ai',
              message: messageResponse,
            });
          }
        });
        console.log('chatHistory', this.chatHistory);

        // Trigger change detection to update the view
        this.cdr.detectChanges();
      }
    });
  }
}
