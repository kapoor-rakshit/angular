import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee_component/emp_comp.component';
import { CustomerComponent } from './customer_component/customer_component.component';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display_routes';
import { EmployeeDetailsComponent } from './employee_component/emp_details';

const appRoutes: Routes = [
  { path: '', component: DisplayComponent },
  { path: 'all', component: AppComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'customers', component: CustomerComponent},
];

export const routing = RouterModule.forRoot(appRoutes);
