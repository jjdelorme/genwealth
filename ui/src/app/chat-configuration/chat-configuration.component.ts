import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRequest } from '../services/genwealth-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-chat-configuration',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,    
    FormsModule,
  ],
  templateUrl: './chat-configuration.component.html',
  styleUrl: './chat-configuration.component.scss'
})
export class ChatConfigurationComponent {
  @Input()
  chatRequest?: ChatRequest;

}
