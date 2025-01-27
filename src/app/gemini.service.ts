import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalStorageAngService } from './local-storage.service'; // Corrected import
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private messageHistory = new BehaviorSubject<any[]>([]);
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  userDataStorage = inject(LocalStorageService); // Corrected type

  uploadFile(formData: FormData): Observable<any> {
    console.log('formDataformData' + formData);
    return this.http.post<any>(`${this.apiUrl}/files/`, formData).pipe(
      tap((response) => {
        const currentHistory: any = {
          prompt: (formData.get('prompt') as string) || '',
          aiResponse: response.response.content,
        };

        // Retrieve existing history from localStorage

        const storedHistory = JSON.parse(
          ((this.userDataStorage as LocalStorageService).retrieve(
            'currentHistory'
          ) as string) || ('[]' as string)
        ) as any[];

        // Ensure storedHistory is an array
        if (!Array.isArray(storedHistory)) {
          throw new Error('Stored history is not an array');
        }

        // Update localStorage with new history
        storedHistory.push(currentHistory);
        (this.userDataStorage as LocalStorageService).store(
          'currentHistory',
          JSON.stringify(storedHistory)
        );

        // Update BehaviorSubject with new history
        this.messageHistory.next(storedHistory);

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
    this.messageHistory.next([]);
    (this.userDataStorage as LocalStorageService).clear('currentHistory');
  }
}
