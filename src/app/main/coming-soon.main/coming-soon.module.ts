import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { ComingSoonComponent } from './coming-soon.component';

const routes = [
    {
        path     : 'coming-soon',
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
