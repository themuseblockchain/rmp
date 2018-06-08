import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
// import { ForgotPasswordComponent } from './main/forgot-password/forgot-password.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { WalletComponent } from './main/wallet/wallet.component';
import { PostComponent } from './main/rights-management/post.component';
import { RightsManagementComponent } from './main/rights-management/rights-management.component';

// Guards
import { AuthService } from './core/services/auth.service';
import { AdminGuard } from './core/services/guards/admin.guard';
import { ManagementGuard } from './core/services/guards/management.guard';
import { UserGuard } from './core/services/guards/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'wallet', component: WalletComponent, pathMatch: 'full' },
      { path: 'post', component: PostComponent, pathMatch: 'full', canActivate: [AdminGuard] },
      { path: 'rights-management', component: RightsManagementComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthService,
    AdminGuard,
    ManagementGuard,
    UserGuard
  ]
})
export class RoutingModule {
}
