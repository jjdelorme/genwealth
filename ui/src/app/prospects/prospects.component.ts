import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient, Prospect, QueryResponse } from '../services/genwealth-api';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProspectResultsComponent } from '../prospect-results/prospect-results.component';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    ProspectResultsComponent,
  ],
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.scss'
})
export class ProspectsComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  prospectSearch: string = '';
  useFilters: boolean = true;
  minAge: number = 21;
  maxAge: number = 65;
  riskProfile: number = 1;

  prospects?: Observable<QueryResponse<Prospect>> = undefined;

  useFiltersChange(change: MatSlideToggleChange) {
    this.useFilters = change.checked;
  }

  formatRiskLabel(value: number): string {
    switch (value) {
      case 1:
        return 'Low';
        break;
      case 2:
        return 'Medium';
        break;
      case 3:
        return 'High';
        break;
      default:
        return '';
        break;
    }
  }

  findProspects() {
    this.prospects = 
      this.genWealthClient.semanticSearchProspects(this.prospectSearch);
  }
}
