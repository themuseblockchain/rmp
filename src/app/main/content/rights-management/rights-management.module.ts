import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { RightsManagementComponent } from './rights-management.component';
import { PostContentComponent } from './post-content/post-content.component';
import { ContentService } from './content/content.service';
import { ContentListService } from './content-list/content-list.service';

const routes = [
    {
        path     : 'rights-management',
        component: RightsManagementComponent,
        resolve  : {
            data : ContentListService
        }
    },
    {
        path     : 'post-content',
        component: PostContentComponent,
    } ,
];

@NgModule({
    declarations: [
        RightsManagementComponent,
        PostContentComponent
    ],
    imports     : [
         SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        RightsManagementComponent,
        PostContentComponent
    ]
})


export class RightsManagementModule
{
}
