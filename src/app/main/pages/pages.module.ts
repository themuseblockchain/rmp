import { NgModule } from '@angular/core';

// import { LoginModule } from './authentication/login/login.module';
// import { RegisterModule } from './authentication/register/register.module';

// import { ForgotPasswordModule } from './authentication/forgot-password/forgot-password.module';
// import { ComingSoonModule } from './coming-soon/coming-soon.module';
// import { Error404Module } from './errors/404/error-404.module';
// import { Error500Module } from './errors/500/error-500.module';
// import { MaintenanceModule } from './maintenance/maintenence.module';
import { ProfileModule } from './profile/profile.module';
import { FaqModule } from './faq/faq.module';
// import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';

@NgModule({
    imports: [
        // Auth
        // LoginModule,
        // RegisterModule,
        // ForgotPasswordModule,

        // Coming-soon
        // ComingSoonModule,

        // Errors
        // Error404Module,
        // Error500Module,

        // Maintenance
        // MaintenanceModule,

        // Profile
        ProfileModule,

        // Faq
        FaqModule,

        // Knowledge base
        // KnowledgeBaseModule
    ]
})
export class PagesModule
{
}
