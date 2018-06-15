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
import { ContentComponent } from './rights-management/content/content.component';
import { ReviewComponent } from './rights-management/review/review.component';
import { RightsManagementComponent } from './rights-management/rights-management.component';
import { WhiteListComponent } from './white-list/white-list.component';
import { GenreComponent } from './rights-management/genre/genre.component';
import { CountriesComponent } from './rights-management/countries/countries.component';
// import { ExplicitComponent } from './rights-management/explicit/explicit.component';
import { ProductTypeComponent } from './rights-management/product-type/product-type.component';
import { ProsComponent } from './rights-management/pros/pros.component';
import { SamplesComponent } from './rights-management/samples/samples.component';
import { WriterRolesComponent } from './rights-management/writer-roles/writer-roles.component';

// import { Ng2SmartTableModule } from 'ng2-smart-table';

// import { AlertComponent } from './components/alert/alert.component';

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
    ScrollbarModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ContentComponent,
    RightsManagementComponent,
    GenreComponent,
    CountriesComponent,
    ProductTypeComponent,
    ProsComponent,
    SamplesComponent,
    WriterRolesComponent,
    WhiteListComponent,
    ReviewComponent
  ],
  providers: [
  ]
})
export class MainModule {
}
