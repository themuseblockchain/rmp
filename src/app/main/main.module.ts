// import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../app-routing.module';
import { MaterialModule } from '../core/common/material.module';
import { SortablejsModule } from 'angular-sortablejs';
import { QuillModule } from 'ngx-quill';
import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { WalletModule } from './wallet/wallet.module';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './rights-management/post.component';
import { RightsManagementComponent } from './rights-management/rights-management.component';
// import { AlertComponent } from './components/alert/alert.component';

import { SharedModule } from '../core/common/shared.module';
import { UIService } from '../core/services/ui.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    WalletModule,
    ComponentsModule,
    QuillModule,
    SortablejsModule,
    ScrollbarModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PostComponent,
    RightsManagementComponent
  ],
  providers: [
    UIService
  ]
})
export class MainModule {
}
