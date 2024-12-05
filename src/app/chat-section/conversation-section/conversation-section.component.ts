import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../gemini.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conversation-section',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './conversation-section.component.html',
  styleUrls: ['./conversation-section.component.css'],
})
export class ConversationSectionComponent implements OnInit {
  chatHistory: any[] = [];

  constructor(
    private getMessageHistory: FileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMessageHistory.getMessageHistory().subscribe((data) => {
      if (data) {
        this.chatHistory = [...this.chatHistory, data];
        this.cdr.detectChanges();
      }
    });
  }
}
