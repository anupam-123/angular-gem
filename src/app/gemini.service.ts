import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { environment } from '../environments/environment';

// gemini.service.ts

// export interface Message {
//   role: string;
//   content: string;
//   images: any;
//   tool_calls: any;
// }

// export interface ResponseMetadata {
//   model: string;
//   created_at: string;
//   done: boolean;
//   done_reason: string;
//   total_duration: number;
//   load_duration: number;
//   prompt_eval_count: number;
//   prompt_eval_duration: number;
//   eval_count: number;
//   eval_duration: number;
//   message: Message;
// }

// export interface UsageMetadata {
//   input_tokens: number;
//   output_tokens: number;
//   total_tokens: number;
// }

// export interface ResponseContent {
//   content: string;
//   additional_kwargs: Record<string, any>;
//   response_metadata: ResponseMetadata;
//   type: string;
//   name: string | null;
//   id: string;
//   example: boolean;
//   tool_calls: any[];
//   invalid_tool_calls: any[];
//   usage_metadata: UsageMetadata;
// }

// export interface MessageResponse {
//   response_content: any;
//   response: ResponseContent;
//   error?: string;
// }
@Injectable({
  providedIn: 'root',
})
export class FileService {
  private messageHistory = new BehaviorSubject<any>([]);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    console.log('formDataformData' + formData);
    return this.http.post<any>(`${this.apiUrl}/files/`, formData).pipe(
      tap((response) => {
        // const currentHistory = this.messageHistory.getValue();
        // console.log('Current History:', currentHistory.length);
        // this.messageHistory.next([...currentHistory, response]);

        // Access the content from the response
        // console.log('Response Content:', response.response.content);

        const currentHistory: any = {
          current: this.messageHistory.getValue(),
          prompt: (formData.get('prompt') as string) || '',
        };
        console.log('Current History:', currentHistory['current'].length);
        this.messageHistory.next([currentHistory, response]);

        console.log('Response Content:', response.response);
      }),
      catchError((error) => {
        throw new Error(`Upload failed: ${error.message}`);
      })
    );
  }

  getMessageHistory(): Observable<any[]> {
    return this.messageHistory.asObservable();
  }

  clearHistory(): void {
    this.messageHistory.next([]);
  }
}
