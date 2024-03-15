import { Component, Input } from '@angular/core';

import { ChatRequest } from '../services/genwealth-api';


@Component({
  selector: 'app-chat-configuration',
  standalone: true,
  imports: [],
  templateUrl: './chat-configuration.component.html',
  styleUrl: './chat-configuration.component.scss'
})
export class ChatConfigurationComponent {
  @Input()
  chatRequest?: ChatRequest;

}
