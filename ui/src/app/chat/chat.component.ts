import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRequest, GenWealthServiceClient } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChatConfigurationComponent } from '../chat-configuration/chat-configuration.component';

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
    ChatConfigurationComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}
  
  showConfiguration: boolean = false;
  chatPlaceholder = "Ask me a question";
  chatRequest: ChatRequest = new ChatRequest("");
  chatResponse?: string = undefined;
  query?: string = undefined;

  private textToHtmlPipe = new TextToHtmlPipe();

  askQuestion() { 
    this.genWealthClient.chat(this.chatRequest)
      .subscribe({ next: response => {
        this.chatResponse = this.textToHtmlPipe.transform(response.llmResponse);
        this.query = response.query;
        // reset
        this.chatRequest.prompt = '';
      }});
  }

  configureChat() {
    console.log('clcked');
    this.showConfiguration = !this.showConfiguration;
  }
}
