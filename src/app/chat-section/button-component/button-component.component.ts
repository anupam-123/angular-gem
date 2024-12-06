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

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    FontAwesomeModule,
  ],
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

      // Fix: Access prompt value correctly
      formData.append('prompt', message.value.prompt);

      if (this.selectedFile) {
        // Add file size validation (e.g., 10MB limit)
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
        if (this.selectedFile.size > MAX_FILE_SIZE) {
          throw new Error('File size exceeds 10MB limit');
        }

        // Verify file type
        if (!this.selectedFile.type.includes('pdf')) {
          throw new Error('Only PDF files are allowed');
        }

        formData.append('fileb', this.selectedFile, this.selectedFile.name);
      }

      // Log FormData contents for debugging
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response: any = await this.fileService
        .uploadFile(formData)
        .toPromise();
      console.log('Response:', response);
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
