import { Component, OnInit } from "@angular/core";
import { IssueService } from "./issue_service";
import { Issue } from './issueinterface';

@Component({
    templateUrl : './issuesComp.html',
    })

export class IssuesComponent implements OnInit{
issues : Issue[];
selectedissues : Issue[];
selectAll : boolean;
descv:boolean = true;
sevev:boolean = true;
statv:boolean = true;
datecrv:boolean = true;
datersv:boolean = true;


constructor(private _issueService: IssueService) {
  this.getIssues();               // for reloading page when navigated here from other component
}

ngOnInit() {
   this.getIssues();             // for reloading page when navigated here from other component
  }

  getIssues() {
    this._issueService.getIssues().subscribe(
      (issues:any) =>  this.issues = issues,
      err => console.log(err)
    );
  }

  deleteissue(id) {
    this._issueService.deleteIssue(id).subscribe(
      (data:any) => this.getIssues()
    );
  }

  deletemultipleissue(){
    this.selectedissues = this.issues.filter(issue => issue.selected);
    for(let issue of this.selectedissues){
      this._issueService.deleteIssue(issue.id).subscribe(
        (data:any) => this.getIssues()
      );
    }
  }

  toggleChk(){
    this.issues.forEach(issue => issue.selected = this.selectAll);
  }
}