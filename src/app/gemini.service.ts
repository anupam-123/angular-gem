import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private messageHistory = new BehaviorSubject<any[]>([]);
  private apiUrl = environment.apiUrl;
  private messageHistoryArr: any[] = [];

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    console.log('formData:', formData);
    return this.http.post<any>(`${this.apiUrl}/files/`, formData).pipe(
      tap((response) => {
        const currentHistory: any = {
          prompt: (formData.get('prompt') as string) || '',
          aiResponse: response.response.content || '',
        };

        // Update the message history array with new history
        this.messageHistoryArr.push(currentHistory);

        // Update BehaviorSubject with new history
        this.messageHistory.next(this.messageHistoryArr);

        console.log('Response Content:', response.response.content);
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
    this.messageHistoryArr = [];
    this.messageHistory.next(this.messageHistoryArr);
  }
}
