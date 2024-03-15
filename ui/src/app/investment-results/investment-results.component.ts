import { Component, Input } from '@angular/core';
import { QueryResponse, Investment } from '../services/genwealth-api';
import { Observable } from 'rxjs';

import { MatExpansionModule } from '@angular/material/expansion';

import { TextToHtmlPipe } from '../services/text-to-html.pipe';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatExpansionModule,
    TextToHtmlPipe,
  ],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.scss'
})
export class InvestmentResultsComponent {
  @Input()
  investments : Observable<QueryResponse<Investment>> | undefined;
}
