// import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from '../app-routing.module';
import { MaterialModule } from '../core/common/material-components.module';
import { SortablejsModule } from 'angular-sortablejs';
import { QuillModule } from 'ngx-quill';

import { ScrollbarModule } from '../core/scrollbar/scrollbar.module';
import { WalletModule } from './wallet/wallet.module';

import { environment } from '../../environments/environment';

import { LoadingOverlayComponent } from '../core/loading-overlay/loading-overlay.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './rights-management/post.component';
import { IconsComponent } from './icons/icons.component';

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
    // AgmCoreModule.forRoot({
    // apiKey: environment.googleApi
    // }),
    QuillModule,
    SortablejsModule,
    ScrollbarModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PostComponent,
    IconsComponent,
    LoadingOverlayComponent
  ],
  providers: [
  ]
})
export class MainModule {
}
