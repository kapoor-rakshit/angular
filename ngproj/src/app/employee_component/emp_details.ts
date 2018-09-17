import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import { EmployeeService } from './emp_service';


@Component({
    templateUrl: './emp_details.html',
})
export class EmployeeDetailsComponent implements OnInit { 
    id: number;
    employees: JSON;


    constructor(private route: ActivatedRoute, private location: Location, private _employeesService: EmployeeService){
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {   // traverse params in URL
            this.id = +params['id'];
        });

        this.getEmployeeDet(this.id);
    }

    getEmployeeDet(empid) {
    this._employeesService.getEmployeeDetails(empid).subscribe(
      (employees:JSON) =>  this.employees = employees,
      err => console.log(err)
    );
    }

    goBack(): void {
        this.location.back();
    }
}
