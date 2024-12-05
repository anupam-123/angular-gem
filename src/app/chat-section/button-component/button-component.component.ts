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
    const file = event.target.files[0];
    console.log('File:', typeof file);
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
        formData.append('file', this.selectedFile);
      }

      const response = await this.fileService.uploadFile(formData).toPromise();
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      this.loadingService.loadingOff();
      this.myForm.reset();
      this.selectedFile = null;
    }
  }
}
