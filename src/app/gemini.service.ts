import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { environment } from '../environments/environment';

interface MessageResponse {
  response: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private messageHistory: BehaviorSubject<MessageResponse[]> =
    new BehaviorSubject<MessageResponse[]>([]);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<MessageResponse> {
    // const headers = new HttpHeaders();
    // Remove Content-Type header to let browser set it with boundary for multipart/form-data
    console.log('Headers:', formData);
    return this.http
      .post<MessageResponse>(`${this.apiUrl}/files/`, formData)
      .pipe(
        tap((response) => {
          const currentHistory = this.messageHistory.getValue();
          this.messageHistory.next([...currentHistory, response]);
        }),
        catchError((error) => {
          throw new Error(`Upload failed: ${error.message}`);
        })
      );
  }

  public getMessageHistory(): Observable<MessageResponse[]> {
    return this.messageHistory.asObservable();
  }

  public clearHistory(): void {
    this.messageHistory.next([]);
  }
}
