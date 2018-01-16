import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ContentListComponent } from './content-list.component';
import { ContentComponent } from './content/content.component';
import { ContentService } from './content/content.service';
import { ContentListService } from './content-list.service';


const routes: Routes = [
    {
        path     : 'content', 
        component: ContentListComponent,
        resolve  : {
            data : ContentListService
        }
    },
    {
        path     : 'content/:id',
        component: ContentComponent,
        resolve  : {
            data: ContentService
        }
    },
    {
        path     : 'content/:id/:handle',
        component: ContentComponent,
        resolve  : {
            data: ContentService
        }
    },
];

@NgModule({
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ContentListComponent,
        ContentComponent
    ],
    providers   : [
        ContentListService,
        ContentService
    ]
})
export class RightsManagementModule
{
}
