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

  chat: string = '';
  chatResponse?: Observable<string> = undefined;

  askQuestion() { 
    const textToHtmlPipe = new TextToHtmlPipe();

    this.chatResponse = this.genWealthClient.chat(this.chat)
      .pipe(
        tap(console.log),
        map(response => textToHtmlPipe.transform(response.llmResponse)));
  }
}
