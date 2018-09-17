import { Component } from "@angular/core";
import { EmployeeService } from "./emp_service";
import { Employee } from './employeeInterface';

@Component({
selector : 'emp-comp',
templateUrl : './emp_comp.component.html',
})

export class EmployeeComponent{
    
placeval="Placeholder here !! :)";

inputvalhere="";

// employees;

// inputval(value){
// this.inputvalhere = value;
// }

// constructor(private _employeesService: EmployeeService) { }

//   ngOnInit() {
//     this.employees = this._employeesService.getEmployees();
//   }

/* SERVICE COMMUNICATION */

employees: Employee[];

  constructor(private _employeesService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this._employeesService.getEmployees().subscribe(
      (employees:any) =>  this.employees = employees,
      err => console.log(err)
    );
  }

  addEmployee() {
    this._employeesService.addEmployee().subscribe(
      (data:any) => this.getEmployees()
    );
  }

  editEmployee(empid, empname) {
    this._employeesService.editEmployee(empid, empname).subscribe(
      (data:any) => this.getEmployees()
    );
  }

  deleteEmployee(empid) {
    this._employeesService.deleteEmployee(empid).subscribe(
      (data:any) => this.getEmployees()
    );
  }


}