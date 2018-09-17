import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { routing }  from './app.routing';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer_component/customer_component.component';
import { EmployeeComponent } from './employee_component/emp_comp.component';
import { EmployeeFilter } from './app.pipe';
import { EmployeeService } from './employee_component/emp_service';
import { DisplayComponent } from './display_routes';

import 'rxjs';
import { EmployeeDetailsComponent } from './employee_component/emp_details';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    EmployeeComponent,
    DisplayComponent,
    EmployeeDetailsComponent,
    EmployeeFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
