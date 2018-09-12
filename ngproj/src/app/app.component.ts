import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngproj';
  process_what_you_write = "";
  employees = [
    {
        "empId": 1,
        "name": "Ram Kumar",
        "location": "Bangalore",
        "clickedOrNot":false
    },
    {
        "empId": 2,
        "name": "Raj Kapoor",
        "location": "Chennai",
        "clickedOrNot":false
    },
    {
        "empId": 3,
        "name": "Vinay Sharma",
        "location": "Pune",
        "clickedOrNot":false
    }
];

clickfunc(empRowclicked) {
  var l = this.employees.length;
  for(let i=0;i<l;i++){
    this.employees[i].clickedOrNot = false;
  }
  empRowclicked.clickedOrNot = true;
}

changefunc(val){
 this.process_what_you_write = val.toUpperCase();
}

}
