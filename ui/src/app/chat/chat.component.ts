import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRequest, ChatResponse, GenWealthServiceClient } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../common/text-to-html.pipe';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ChatConfigurationComponent } from './configuration/chat-configuration.component';
import { SqlStatementComponent } from '../common/sql-statement/sql-statement.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,    
    MatSlideToggle,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TextToHtmlPipe,
    SqlStatementComponent,
    MatIconModule,
    MatTooltipModule,
    ChatConfigurationComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}
  
  chatPlaceholder = "Ask me a question";
  loading: boolean = false;
  chatRequest: ChatRequest = new ChatRequest("");
  chatResponse?: ChatResponse = undefined;
  
  askQuestion() { 
    this.loading = true;
    this.genWealthClient.chat(this.chatRequest)
      .subscribe({ next: response => {
        this.chatResponse = response;
        this.loading = false;
      }});
  }
}
