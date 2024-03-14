import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient } from '../services/genwealth-api';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,    
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  chat: string = '';
  chatResponse?: Observable<string> = undefined;

  askQuestion() { 
    this.chatResponse = this.genWealthClient.chat(this.chat);
  }
}
