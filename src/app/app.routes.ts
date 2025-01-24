import { Routes } from '@angular/router';
import { AuthComponent } from './auth/login/auth.component';
import { ChatSectionComponent } from './chat-section/chat-section.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatSectionComponent },
];
