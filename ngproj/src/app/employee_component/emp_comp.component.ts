import { Component } from "@angular/core";

@Component({
selector : 'emp-comp',
templateUrl : './emp_comp.component.html',
})

export class EmployeeComponent{
    
placeval="Placeholder here !! :)";

inputvalhere="";

inputval(value){
this.inputvalhere = value;
}

}