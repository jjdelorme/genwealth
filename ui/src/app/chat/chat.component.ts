import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';

import { GenWealthServiceClient } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,    
    TextToHtmlPipe,
    MatCardModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}
  
  chatPlaceholder = "Ask me a question";
  chat: string = '';
  chatResponse?: string = undefined;
  query?: string = undefined;

  private textToHtmlPipe = new TextToHtmlPipe();

  askQuestion() { 
    this.genWealthClient.chat(this.chat)
      .subscribe({ next: response => {
        this.chatResponse = this.textToHtmlPipe.transform(response.llmResponse);
        this.query = response.query;
      }});
    // reset
    this.chat = '';
  }
}
