import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRequest } from '../services/genwealth-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-chat-configuration',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,    
    MatSlideToggle,
    FormsModule,
  ],
  templateUrl: './chat-configuration.component.html',
  styleUrl: './chat-configuration.component.scss'
})
export class ChatConfigurationComponent {
  @Input()
  chatRequest?: ChatRequest;

}
