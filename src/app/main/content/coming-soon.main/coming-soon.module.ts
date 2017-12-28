import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { ComingSoonComponent } from './coming-soon.component';

const routes = [
    {
        path     : 'pages/coming-soon',
        // component: ComingSoonComponent
    }
];

@NgModule({
    declarations: [
        // ComingSoonComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ]
})

export class ComingSoonModule {

}
