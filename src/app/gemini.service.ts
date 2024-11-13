import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments';
import { BehaviorSubject, Observable } from 'rxjs';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI | null = null;

  constructor() {
    this.generativeAI = new GoogleGenerativeAI(environment.apiKey);
  }

  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  async generateText(prompt: string) {
    if (prompt) {
      new Error('Prompt is empty');
    }
    const model = this.generativeAI!.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    this.messageHistory.next({
      from: 'user',
      message: prompt,
    });

    const result = await model.generateContent(prompt);
    // const textResponse = result.response.text();
    const html = marked.parse(result.response.text());

    this.messageHistory.next({
      from: 'Bot',
      message: html,
    });
    // console.log('From the result', result.response.text);
  }
  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
