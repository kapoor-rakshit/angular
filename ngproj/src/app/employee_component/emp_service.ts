import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class EmployeeService{
    // getEmployees(){     HARDCODED vals
    //     return [
    //         {
    //             "id": 1,
    //             "name": "Ram",
    //         },
    //         {
    //             "id": 2,
    //             "name": "Janak Raj Kapoor",
    //         },
    //         {
    //             "id": 3,
    //             "name": "Vinay",
    //         }
    //     ];
    // }

    /* SERVICE COMMUNICATION */

    private _employeesUrl = "http://localhost:3000/employees";     /* URL of JSON server */
    private count=100;
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor (private _http: HttpClient) { }

    getEmployees() {
        return this._http.get(this._employeesUrl);
    }

    getEmployeeDetails(idval:any){
        return this._http.get(this._employeesUrl+"/"+idval);
    }

    addEmployee() {
        this.count++;
        let newEmployee = {
            "id": this.count,
            "name": "Emp-" + this.count
        }
        return this._http.post(this._employeesUrl, newEmployee, this.httpOptions);
    }

    editEmployee(empid,  empname) {
        let editEmployeeURL = `${this._employeesUrl}/${empid}`;
        let updatedEmployee = {
            "name": empname + "_U"
        }
        return this._http.put(editEmployeeURL, updatedEmployee, this.httpOptions);
    }

    deleteEmployee(empid) {
        let deleteEmployeeURL = `${this._employeesUrl}/${empid}`;
        return this._http.delete(deleteEmployeeURL);
    }

}