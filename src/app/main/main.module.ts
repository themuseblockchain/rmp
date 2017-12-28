import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { MainComponent } from './main.component';
import { ContentComponent } from './content/content.component';
// import { FooterComponent } from './components/footer/footer.component';
import { NavbarVerticalComponent } from './components/navbar/vertical/navbar-vertical.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavigationModule } from '../core/components/navigation/navigation.module';
import { NavbarVerticalToggleDirective } from './components/navbar/vertical/navbar-vertical-toggle.directive';
import { ThemeComponent } from '../core/components/theme/theme.component';
import { SearchBarModule } from '../core/components/search-bar/search-bar.module';

@NgModule({
    declarations: [
        ContentComponent,
        // FooterComponent,
        MainComponent,
        NavbarVerticalComponent,
        ToolbarComponent,
        NavbarVerticalToggleDirective,
        ThemeComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
        NavigationModule,
        SearchBarModule
    ],
    exports     : [
        MainComponent
    ]
})

export class MainModule
{
}
