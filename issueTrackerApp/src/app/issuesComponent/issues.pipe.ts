import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name : 'issueFilter'})
export class IssueFilter implements PipeTransform{

    transform(value , args){
        
        let searchfilter = args ? args.toLowerCase() : null;

        return searchfilter ? value.filter(issue => issue.desc.toLowerCase().indexOf(searchfilter)!=-1):value;
    }

}