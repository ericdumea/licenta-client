import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProviderOverviewComponent} from './provider-overview/provider-overview.component';
import {ConsumerOverviewComponent} from './consumer-overview/consumer-overview.component';
import {ProviderInsertionComponent} from './provider-insertion/provider-insertion.component';
import {ConsumerInsertionComponent} from './consumer-insertion/consumer-insertion.component';
import {ResultsPageComponent} from './results-page/results-page.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'provider-overview', component: ProviderOverviewComponent},
  {path: 'consumer-overview', component: ConsumerOverviewComponent},
  {path: 'provider-insertion', component: ProviderInsertionComponent},
  {path: 'consumer-insertion', component: ConsumerInsertionComponent},
  {path: 'results-page', component: ResultsPageComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
