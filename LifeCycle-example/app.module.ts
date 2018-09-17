import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { EmployeesComponent }  from './employees/employees.component';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, EmployeesComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
