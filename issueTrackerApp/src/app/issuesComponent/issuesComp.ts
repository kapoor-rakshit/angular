import { Component, OnInit } from "@angular/core";
import { IssueService } from "./issue_service";
import { Issue } from './issueinterface';

@Component({
    templateUrl : './issuesComp.html',
    })

export class IssuesComponent implements OnInit{
issues : Issue[];

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
}