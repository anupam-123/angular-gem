import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GeminiService } from '../../gemini.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-component',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, CommonModule],
  templateUrl: './button-component.component.html',
  styleUrls: ['./button-component.component.css'],
})
export class ButtonComponentComponent implements OnInit {
  myForm!: FormGroup;
  result: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private geminiService: GeminiService
  ) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      // Use formBuilder instead of messageService
      prompt: ['', Validators.required],
    });
  }

  async submitMessage(message: FormGroup) {
    try {
      await this.geminiService.generateText(message.value.prompt);
      this.myForm.reset();
    } catch (e) {
      console.log(e);
    }
  }
}
