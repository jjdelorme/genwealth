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
import { TextToHtmlPipe } from '../common/text-to-html.pipe';

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
    TickerAutocompleteComponent,
    TextToHtmlPipe
  ],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ResearchComponent {
  showResults: boolean = false;
  searching: boolean = false;
  ragSearching: boolean = false;  
  uploading: boolean = false;
  uploaded: boolean = false;
  uploadTicker?: string = undefined;
  searchTicker?: string = undefined;
  searchQuery?: string = undefined;
  summary?: string = undefined;
  ragSummary? : string = undefined;
  ragPrompt?: string = undefined;

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

    this.showResults = true;
    this.searching = true;
    this.ragSearching = true;
    
    this.summary = undefined;
    this.ragSummary = undefined;

    this.genWealthClient.searchProspectus(this.searchTicker, this.searchQuery!).subscribe({
      next: (response) => {
        this.summary = response;
        this.searching = false;
      },
      error: (error) => {
        console.log('error', error);
        this.searching = false;
      }
    });

    this.genWealthClient.ragSearchProspectus(this.searchTicker, this.searchQuery!).subscribe({
      next: (response) => {
        this.ragSummary = response.data ? response.data[0] : undefined;
        this.ragPrompt = response?.query;
        this.ragSearching = false;
      },
      error: (error) => {
        console.log('error', error);
        this.ragSearching = false;
      }
    });
  }

  setSearchTicker(ticker: string) {
    this.searchTicker = ticker;
  }
}
