import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
// import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { WalletComponent } from './main/wallet/wallet.component';
import { ContentComponent } from './main/rights-management/content/content.component';
import { RightsManagementComponent } from './main/rights-management/rights-management.component';
import { WhiteListComponent } from './main/white-list/white-list.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'wallet',
        component: WalletComponent,
        pathMatch: 'full'
      },
      {
        path: 'content',
        component: ContentComponent,
        pathMatch: 'full'
      },
      {
        path: 'rights-management',
        component: RightsManagementComponent,
        pathMatch: 'full'
      },
      {
        path: 'white-list',
        component: WhiteListComponent,
        pathMatch: 'full'
      },
      {
        path: 'buy',
        component: WalletComponent,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule {
}
