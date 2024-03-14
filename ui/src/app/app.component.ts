import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Observable, of } from 'rxjs';
import { GenWealthServiceClient } from './services/genwealth-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [

  ]
})
export class AppComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  title = 'GenWealth Advisor';

  chatResponse?: Observable<string> = undefined;

  askQuestion() { 
    this.chatResponse = this.genWealthClient.chat('I want to make millions.');
  }
}
