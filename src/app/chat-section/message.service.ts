import { Injectable, Output } from '@angular/core';
import { chat_model } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // @Output('')
  messages: string[] = [];
  constructor() {}
  submitMessage(message: string) {
    this.messages.push(message);
  }
}
