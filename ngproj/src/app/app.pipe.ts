import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name : 'employeefilter'})
export class EmployeeFilter implements PipeTransform{

    transform(value , args){
        console.log(value);
        console.log(args);
        
        let searchfilter = args ? args.toLowerCase() : null;

        return searchfilter ? value.filter(emp => emp.name.toLowerCase().indexOf(searchfilter)!=-1):value;
    }

}