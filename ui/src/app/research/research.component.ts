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
import { TickerAutocompleteComponent } from '../common/ticker-autocomplete/ticker-autocomplete.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
    TickerAutocompleteComponent
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ResearchComponent {
  searching: boolean = false;
  uploading: boolean = false;
  uploaded: boolean = false;
  uploadTicker?: string = undefined;
  searchTicker?: string = undefined;
  searchQuery?: string = undefined;
  summary?: string = undefined;

  constructor(private genWealthClient: GenWealthServiceClient) {}

  uploadProspectus(event: any) {
    const file = event.target.files[0];

    if (this.uploadTicker && file) {
      this.uploading = true;
      
      this.genWealthClient.uploadProspectus(this.uploadTicker, file).subscribe({
        next: () => {
          this.uploaded = true;
          this.uploading = false;
        },
        error: (error) => {
          console.log('error', error);
          this.uploading = false;
        }
      });
    }
  }  

  reset() {
    this.uploaded = false;
    this.uploadTicker = undefined;
  }

  search() {
    if (!this.searchTicker || !this.searchQuery)
      return;

    this.searching = true;
    this.summary = undefined;

    this.genWealthClient.searchProspectus(this.searchTicker, this.searchQuery!).subscribe({
      next: (response) => {
        this.summary = response;
        this.searching = false;
      },
      error: (error) => {
        console.log('error', error);
        this.searching = false;
      }
    })
  }

  setSearchTicker(ticker: string) {
    this.searchTicker = ticker;
  }
}
