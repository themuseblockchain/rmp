import { Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KnowledgeBaseService } from './knowledge-base.service';
import { MatDialog } from '@angular/material';
import { KnowledgeBaseArticleComponent } from './dialogs/article/article.component';

@Component({
    selector     : 'knowledge-base',
    templateUrl  : './knowledge-base.component.html',
    styleUrls    : ['./knowledge-base.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class KnowledgeBaseComponent implements OnInit, OnDestroy
{
    knowledgeBase: any;
    onKnowledgeBaseChanged: Subscription;

    constructor(
        private knowledgeBaseService: KnowledgeBaseService,
        private matDialog: MatDialog
    )
    {

    }

    ngOnInit()
    {
        this.onKnowledgeBaseChanged =
            this.knowledgeBaseService.onKnowledgeBaseChanged
                .subscribe(response => {
                    this.knowledgeBase = response;
                });
    }

    ngOnDestroy()
    {
        this.onKnowledgeBaseChanged.unsubscribe();
    }

    readArticle(article)
    {
        this.matDialog.open(KnowledgeBaseArticleComponent, {
            panelClass: 'knowledgebase-article-dialog',
            data : {article: article}
        });
    }
}
