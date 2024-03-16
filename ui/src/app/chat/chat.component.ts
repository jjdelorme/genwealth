import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRequest, GenWealthServiceClient } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ChatConfigurationComponent } from '../chat-configuration/chat-configuration.component';
import { SqlStatementComponent } from '../sql-statement/sql-statement.component';

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
  chatResponse?: string = undefined;
  query?: string = undefined;
  
  private textToHtmlPipe = new TextToHtmlPipe();

  askQuestion() { 
    this.loading = true;
    this.genWealthClient.chat(this.chatRequest)
      .subscribe({ next: response => {
        this.chatResponse = this.textToHtmlPipe.transform(response.llmResponse);
        this.query = response.query;
        this.loading = false;
      }});
  }
}
