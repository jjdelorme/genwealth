import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';

import { ChatRequest, GenWealthServiceClient } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,    
    MatSidenavModule,
    MatCardModule,
    TextToHtmlPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}
  
  showConfiguration: boolean = false;
  chatPlaceholder = "Ask me a question";
  chat: string = '';
  chatResponse?: string = undefined;
  query?: string = undefined;

  private textToHtmlPipe = new TextToHtmlPipe();

  askQuestion() { 
    const request = new ChatRequest(this.chat);
    this.genWealthClient.chat(request)
      .subscribe({ next: response => {
        this.chatResponse = this.textToHtmlPipe.transform(response.llmResponse);
        this.query = response.query;
        // reset
        this.chat = '';        
      }});
  }

  configureChat() {
    console.log('clcked');
    this.showConfiguration = !this.showConfiguration;
  }
}
