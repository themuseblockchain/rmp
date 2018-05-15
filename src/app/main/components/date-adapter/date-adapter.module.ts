// Custom DateAdapter
import {NgModule} from '@angular/core';
import {MatDatepickerModule, MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';

// extend NativeDateAdapter's format method to specify the date format.
export class CustomDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
         const day = date.getUTCDate();
         const MMM = date.getUTCMonth() + 1;
         const year = date.getFullYear();
         return `${year}-${MMM}-${day}`;
      } else {
         return date.toDateString();
      }
   }
}

const MY_DATE_FORMATS = {
   parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
   },
   display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'},
   }
};

@NgModule({
   declarations: [],
   imports: [],
   exports: [MatDatepickerModule, MatNativeDateModule],
   providers: [
      {
         provide: DateAdapter, useClass: CustomDateAdapter
      },
      {
         provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
      }
   ]
})

export class DatePickerModule {

}
