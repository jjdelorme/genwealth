import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GenWealthServiceClient } from '../services/genwealth-api';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-prospectus',
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
  templateUrl: './prospectus.component.html',
  styleUrl: './prospectus.component.scss',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ProspectusComponent {
  uploaded: boolean = false;
  ticker?: string = undefined;
  searchQuery?: string = undefined;
  summary?: string = undefined;

  constructor(private genWealthClient: GenWealthServiceClient) {}

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
