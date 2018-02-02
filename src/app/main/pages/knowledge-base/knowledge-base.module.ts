import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { KnowledgeBaseService } from './knowledge-base.service';
import { KnowledgeBaseComponent } from './knowledge-base.component';
import { KnowledgeBaseArticleComponent } from './dialogs/article/article.component';

const routes = [
    {
        path     : 'pages/knowledge-base',
        component: KnowledgeBaseComponent,
        resolve  : {
            knowledgeBase: KnowledgeBaseService
        }
    }
];

@NgModule({
    declarations   : [
        KnowledgeBaseComponent,
        KnowledgeBaseArticleComponent
    ],
    imports        : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers      : [
        KnowledgeBaseService
    ],
    entryComponents: [
        KnowledgeBaseArticleComponent
    ]
})
export class KnowledgeBaseModule
{
}
