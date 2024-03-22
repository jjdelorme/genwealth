import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {GenWealthServiceClient} from '../../services/genwealth-api';

/**
 * @title Ticker symbol autocomplete
 */
@Component({
  selector: 'app-ticker-autocomplete',
  templateUrl: 'ticker-autocomplete.component.html',
  styleUrl: 'ticker-autocomplete.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class TickerAutocompleteComponent {
  tickerControl = new FormControl('');
  tickers?: Observable<string[]>;

  constructor(private genWealthClient: GenWealthServiceClient) {
    this.tickers = this.genWealthClient.getTickers();
  }

  @Output()
  tickerSelected = new EventEmitter<string>();

  onTickerSelected(ticker: string) {
    this.tickerSelected.emit(ticker);
  }
}
