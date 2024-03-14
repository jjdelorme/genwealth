import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenWealthServiceClient, Prospect } from '../services/genwealth-api';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-prospects',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.scss'
})
export class ProspectsComponent {
  constructor(private genWealthClient: GenWealthServiceClient) {}

  prospectSearch: string = '';
  prospects?: Observable<Prospect[]> = undefined;

  findProspects() {
    this.prospects = 
      this.genWealthClient.semanticSearchProspects(this.prospectSearch);
  }
}
