import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { PostComponent } from './post.component';

const routes = [
    {
        path     : 'post',
        component: PostComponent
    }
];

@NgModule({
    declarations: [
        PostComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        PostComponent
    ]
})

export class PostModule
{
}
