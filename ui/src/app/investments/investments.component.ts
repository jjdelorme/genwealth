import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient, Investment } from '../services/genwealth-api';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  investmentSearch: string = '';
  investments?: Observable<Investment[]> = undefined;
  
  findInvestments() {
    this.investments = 
      this.genWealthClient.semanticSearchInvestments(this.investmentSearch);
  }
}
