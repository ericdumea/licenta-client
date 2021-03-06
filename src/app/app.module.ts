import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProviderOverviewComponent } from './provider-overview/provider-overview.component';
import { ProviderDetailComponent } from './provider-detail/provider-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsModule } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';
import { ConsumerOverviewComponent } from './consumer-overview/consumer-overview.component';
import { ProviderInsertionComponent } from './provider-insertion/provider-insertion.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import { ConsumerInsertionComponent } from './consumer-insertion/consumer-insertion.component';
import { ResultsPageComponent } from './results-page/results-page.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ProviderOverviewComponent,
    ProviderDetailComponent,
    DashboardComponent,
    SidebarComponent,
    ConsumerOverviewComponent,
    ProviderInsertionComponent,
    ConsumerInsertionComponent,
    ResultsPageComponent,
    LoadingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartsModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
