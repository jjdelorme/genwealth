import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GenWealthServiceClient } from '../../services/genwealth-api';

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
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class TickerAutocompleteComponent implements OnInit {
  tickerControl = new FormControl('');
  tickers?: string[];
  filteredTickers?: Observable<string[]>;

  constructor(private genWealthClient: GenWealthServiceClient) {}

  @Output()
  tickerSelected = new EventEmitter<string>();

  onTickerSelected(ticker: string) {
    this.tickerSelected.emit(ticker);
  }

  ngOnInit() {
    this.genWealthClient.getTickers().subscribe((tickers) => {
      this.tickers = tickers;
    });

    this.filteredTickers = this.tickerControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    if (!this.tickers)
      return [];

    const filterValue = value.toUpperCase();

    return this.tickers.filter(ticker => ticker.toUpperCase().includes(filterValue));
  }
}
