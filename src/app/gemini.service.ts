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

  // Define your system instruction here
  private systemInstruction =
    'You are a helpful assistant that answers questions concisely.';

  constructor() {
    this.generativeAI = new GoogleGenerativeAI(environment.apiKey);
  }
  private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

  async generateText(prompt: string) {
    if (!prompt) {
      throw new Error('Prompt is empty');
    }

    const model = this.generativeAI!.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    this.messageHistory.next({
      from: 'user',
      message: prompt,
    });

    const result = await model.generateContent(`${prompt}`);

    const transpiledResponse = marked.parse(result.response.text());

    this.messageHistory.next({
      from: 'Bot',
      message: transpiledResponse,
    });
  }

  public getMessageHistory(): Observable<any> {
    return this.messageHistory.asObservable();
  }
}
