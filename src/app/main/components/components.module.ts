import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../core/common/material.module';
import { ScrollbarModule } from '../../core/scrollbar/scrollbar.module';
import { DatePickerModule } from './date-adapter/date-adapter.module'; 

import { AlertComponent } from './alert/alert.component';
import { TacComponent } from './modal/terms-conditions/tac.component';
import { ArtistComponent } from './modal/content/artist/artist.component';
import { PublishersComponent } from './modal/content/publishers/publishers.component';
import { WritersComponent } from './modal/content/writers/writers.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollbarModule,
    DatePickerModule
  ],
  declarations: [
    AlertComponent,
    TacComponent,
    ArtistComponent,
    PublishersComponent,
    WritersComponent
  ],
  entryComponents: [
    AlertComponent,
    TacComponent,
    ArtistComponent,
    PublishersComponent,
    WritersComponent,
  ]
})

export class ComponentsModule {
}
