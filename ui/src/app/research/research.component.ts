import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient } from '../services/genwealth-api';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatTooltipModule,    
    MatTabsModule,
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ResearchComponent {
  uploaded: boolean = false;
  ticker?: string = undefined;
  searchQuery?: string = undefined;
  summary?: string = undefined;
  tickers?: Observable<string[]> = undefined;

  constructor(private genWealthClient: GenWealthServiceClient) {
    this.tickers = this.genWealthClient.getTickers();
  }

  uploadProspectus(event: any) {
    const file = event.target.files[0];

    if (this.ticker && file) {
      this.genWealthClient.uploadProspectus(this.ticker, file).subscribe({
        next: () => {
          this.uploaded = true;
        },
        error: (error) => {
          console.log('error', error);
        }
      });
    }
  }  

  reset() {
    this.uploaded = false;
    this.ticker = undefined;
  }

  search() {
    if (!this.ticker || !this.searchQuery)
      return;

    this.genWealthClient.searchProspectus(this.ticker, this.searchQuery!).subscribe({
      next: (response) => {
        this.summary = response;
      },
      error: (error) => {
        console.log('error', error);
      }
    })
  }
}
