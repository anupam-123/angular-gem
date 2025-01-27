import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FileService } from '../../gemini.service';
import { LoadingService } from '../loading.service';
// import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-button-component',
  // imports: [
  //     FormsModule,
  //     ReactiveFormsModule,
  //     MatIconModule,
  //     CommonModule,
  //     FontAwesomeModule,
  // ],
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css'],
})
export class ButtonComponentComponent implements OnInit {
  myForm!: FormGroup;
  result: string = '';
  selectedFile: File | null = null;
  loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.loading$;
  faPaperclip = faPaperclip;

  constructor(
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      prompt: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    console.log('file', event);
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async submitMessage(message: FormGroup) {
    if (!message.valid) return;

    try {
      this.loadingService.loadingOn();
      const formData = new FormData();

      formData.append('prompt', message.value.prompt);

      if (this.selectedFile) {
        const MAX_FILE_SIZE = 10 * 1024 * 1024;
        if (this.selectedFile.size > MAX_FILE_SIZE) {
          throw new Error('File size exceeds 10MB limit');
        }

        if (!this.selectedFile.type.includes('pdf')) {
          throw new Error('Only PDF files are allowed');
        }

        formData.append('fileb', this.selectedFile, this.selectedFile.name);
      }

      formData.forEach((value, key) => {
        console.log(`fff${key}:`, value);
      });

      const fileResponse: any = this.fileService
        .uploadFile(formData)
        .subscribe((Response) => {
          console.log('Response:', Response);
        });

      console.log('Response:', fileResponse);
    } catch (error: any) {
      console.error('Error submitting form:', error.message);
      // Handle specific error cases
      if (error.status === 422) {
        console.error('Server validation failed:', error.error);
      }
    } finally {
      this.loadingService.loadingOff();
      this.myForm.reset();
      this.selectedFile = null;
    }
  }
}
