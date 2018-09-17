import { Component, Input } from "@angular/core";

@Component({
    selector: 'cust-comp',
    templateUrl : './customer_component.component.html',
})

export class CustomerComponent{
    customer_name = 'RA@))@$)@$';

    @Input() working_at;
}