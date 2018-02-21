import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../core/modules/shared.module';
import { AuthRoutingModule } from '../auth-routing.routing';
import { AlertComponent } from '../directives/alert.component';
import { AuthGuard } from '../guards/auth.guard';
import { AlertService } from '../services/alert.service';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent} from './login.component';

const routes = [
    {
        path     : 'login',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [
        AlertComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        SharedModule
    ],
    providers: [
        AuthGuard,
        AlertService
    ],
    entryComponents: [AlertComponent],
})

export class LoginModule {
}
