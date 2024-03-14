import { Component, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { GenWealthServiceClient, Investment, Prospect } from './services/genwealth-api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  chat: string = '';
  investmentSearch: string = '';
  prospectSearch: string = '';

  chatResponse?: Observable<string> = undefined;
  investments?: Observable<Investment[]> = undefined;
  prospects?: Observable<Prospect[]> = undefined;

  askQuestion() { 
    this.chatResponse = this.genWealthClient.chat(this.chat);
  }

  findInvestments() {
    this.investments = 
      this.genWealthClient.semanticSearchInvestments(this.investmentSearch);
  }

  findProspects() {
    this.prospects = 
      this.genWealthClient.semanticSearchProspects(this.prospectSearch);
  }
}
