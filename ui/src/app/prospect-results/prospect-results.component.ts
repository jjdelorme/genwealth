import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Prospect, QueryResponse } from '../services/genwealth-api';
import { TextToHtmlPipe } from '../services/text-to-html.pipe';
import { SqlStatementComponent } from '../sql-statement/sql-statement.component';

@Component({
  selector: 'app-prospect-results',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatButtonModule, 
    SqlStatementComponent,
    MatIconModule,
    TextToHtmlPipe,
  ],
  templateUrl: './prospect-results.component.html',
  styleUrl: './prospect-results.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
export class ProspectResultsComponent {
  @Input()
  set prospects(observable: Observable<QueryResponse<Prospect>>) {
    observable.subscribe({ next: response => {
      if (response.data)
        this.dataSource.data = response.data; 
      this.query = response.query;
    }});
  }

  columnsToDisplay: string[] = ['id', 'firstName','lastName','email','age','riskProfile'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement?: Prospect | null;  
  dataSource = new MatTableDataSource<Prospect>();
  query?: string = undefined;
}
