import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { InvestmentsComponent } from './investments/investments.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { ChatComponent } from './chat/chat.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    InvestmentsComponent,
    ProspectsComponent,
    ChatComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
