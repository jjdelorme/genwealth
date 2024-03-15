import { Routes } from '@angular/router';
import { InvestmentsComponent } from './investments/investments.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {path: 'investments', component: InvestmentsComponent},
    {path: 'prospects', component: ProspectsComponent},
    {path: 'chat', component: ChatComponent},
    {path: '',   redirectTo: '/investments', pathMatch: 'full'},
];
