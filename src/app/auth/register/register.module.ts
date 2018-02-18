import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from '../auth-routing.routing';
// import { AuthComponent } from '../auth.component';
// import { AlertComponent } from '../directives/alert.component';
// import { LogoutComponent } from '../logout/logout.component';
import { AuthGuard } from '../guards/auth.guard';
import { AlertService } from '../services/alert.service';
// import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@NgModule({
    declarations: [
        // AuthComponent,
        // AlertComponent,
        // LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
    ],
    providers: [
        AuthGuard,
        AlertService,
        // AuthenticationService,
        UserService
    ],
    // entryComponents: [AlertComponent],
})

export class RegisterModule{

}
