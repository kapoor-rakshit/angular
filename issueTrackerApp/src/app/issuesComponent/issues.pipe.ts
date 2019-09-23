import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name : 'issueFilter'})
export class IssueFilter implements PipeTransform{

    transform(value , args){                                   /* value is corresponding data in issue array , args is passed after : in HTML */
        
        let searchfilter = args ? args.toLowerCase() : null;   /* check if anything passed as arg or not */

        return searchfilter ? value.filter(issue => issue.desc.toLowerCase().indexOf(searchfilter)!=-1):value;
    }

}
