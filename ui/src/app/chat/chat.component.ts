import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient } from '../services/genwealth-api';
import { Observable, map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,    
    TextToHtmlPipe,
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
      .pipe(map(textToHtmlPipe.transform));
  }
}
