import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileAboutComponent } from './tabs/about/about.component';
import { ProfilePhotosVideosComponent } from './tabs/photos-videos/photos-videos.component';
import { ProfileService } from './profile.service';

const routes = [
    {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
            profile: ProfileService
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent
    ],
    imports: [
        RouterModule.forChild(routes)
    ],
    providers: [
        ProfileService
    ]
})
export class ProfileModule {
}
