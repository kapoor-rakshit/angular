import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name : 'issueFilter'})
export class IssueFilter implements PipeTransform{

    transform(value , args){                                   /* value is issue array , args is passed after : in HTML */
        
        let searchfilter = args ? args.toLowerCase() : null;   /* check if anything passed as arg or not */

                /* array.filter(func) creates a new array with all elements that pass the test implemented by the provided function. */
        return searchfilter ? value.filter(issue => issue.desc.toLowerCase().indexOf(searchfilter)!=-1):value;
    }

}
