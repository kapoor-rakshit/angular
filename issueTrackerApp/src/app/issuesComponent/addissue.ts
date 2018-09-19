import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IssueService } from './issue_service';

@Component({
    templateUrl: './addissue.html'
  })

export class AddIssue{

    severity: string[] = ["Minor", "Major", "Critical"];
    status: string[] = ["Open", "In Progress", "Closed"];

    constructor(private _issueService: IssueService, private router: Router) { }

    onSubmit(formValue: any){
        
        let newIssue = {
              desc: formValue.desc,
              severity: formValue.severity,
              status: formValue.status,
              datecr: formValue.datecr,
              daters: formValue.daters
            };
        this._issueService.addIssue(newIssue).subscribe();
        this.router.navigate(['issues']);
      }
}