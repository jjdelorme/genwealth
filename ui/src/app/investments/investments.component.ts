import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient, Investment, InvestmentResponse } from '../services/genwealth-api';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';

import { InvestmentResultsComponent } from '../investment-results/investment-results.component';

export enum SearchType {
  KEYWORD = 'keyword',
  SEMANTIC = 'semantic'
}

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    InvestmentResultsComponent,
  ],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  searchTypes = SearchType;

  investmentSearch: string = '';
  searchType: string = SearchType.KEYWORD;

  investments?: Observable<InvestmentResponse> = undefined;
  
  findInvestments() {
    switch (this.searchType) {
      case SearchType.KEYWORD:
        this.investments = 
          this.genWealthClient.searchInvestments(this.investmentSearch.split(','));
        break;
      case SearchType.SEMANTIC:
        this.investments = 
          this.genWealthClient.semanticSearchInvestments(this.investmentSearch);
        break;
      default:
        break;
    }
  }
}
