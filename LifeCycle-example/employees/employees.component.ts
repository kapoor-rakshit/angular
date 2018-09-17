import { Component, Input, SimpleChange, OnInit, OnChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'my-emp',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit, OnChanges, OnDestroy {
  title: string = 'Employees List';
  @Input() companyName: string;
  @Input() locationInfo: string;

  ngOnInit() {
    console.log('OnInit of EmployeesComponent ...');
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`OnChanges ==> ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

  ngOnDestroy() {
    console.log('OnDestroy of EmployeesComponent ...');
  }
}
