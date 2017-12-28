import { NgModule } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { NavVerticalItemComponent } from './vertical/nav-item/nav-vertical-item.component';
import { NavVerticalCollapseComponent } from './vertical/nav-collapse/nav-vertical-collapse.component';
import { NavVerticalGroupComponent } from './vertical/nav-group/nav-vertical-group.component';
import { NavHorizontalItemComponent } from './horizontal/nav-item/nav-horizontal-item.component'; 
import { NavHorizontalCollapseComponent } from './horizontal/nav-collapse/nav-horizontal-collapse.component';

@NgModule({
    imports     : [
        SharedModule,
        RouterModule
    ],
    exports     : [
        NavigationComponent
    ],
    declarations: [
        NavigationComponent,
        NavVerticalGroupComponent,
        NavVerticalItemComponent,
        NavVerticalCollapseComponent,
        NavHorizontalItemComponent,
        NavHorizontalCollapseComponent
    ]
})
export class NavigationModule
{
}
