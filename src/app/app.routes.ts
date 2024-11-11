import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ChatSectionComponent } from './chat-section/chat-section.component';

export const routes: Routes = [
{path:'', component: AuthComponent},
{path:'chat', component: ChatSectionComponent},
];
