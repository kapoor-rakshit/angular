import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IssueService } from "./issue_service";

@Component({
    templateUrl: './editissue.html'
  })

export class EditIssue implements OnInit{
    severity: string[] = ["Minor", "Major", "Critical"];
    status: string[] = ["Open", "In Progress", "Closed"];

    id: any;
    issue: any;

    constructor(private _issueService: IssueService, private route: ActivatedRoute, private router: Router) {
      this.route.params.forEach((params: Params) => {
        this.id = +params['id'];
    });
    this.issue = this._issueService.getIssue(this.id);
    }

  ngOnInit() {
      
  }

  onSubmit(formValue: any){
    let updatedissue = {
          id: this.issue.id,
          desc: formValue.desc,
          status: formValue.status,
          severity: formValue.severity,
          datecr: formValue.datecr,
          daters: formValue.daters
        };
    this._issueService.updateIssue(updatedissue, this.id).subscribe();
    this.router.navigate(['issues']);
  }
}