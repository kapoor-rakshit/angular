import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { IssueService } from "./issue_service";
import { Issue } from './issueinterface';

@Component({
    templateUrl: './editissue.html'
  })

export class EditIssue implements OnInit{
    severity: string[] = ["Minor", "Major", "Critical"];
    status: string[] = ["Open", "In Progress", "Closed"];

    id: any;
    issue:Issue[];

    constructor(private _issueService: IssueService, private route: ActivatedRoute, private router: Router) {
      this.route.params.forEach((params: Params) => {
        this.id = +params['id'];
    });
    this._issueService.getIssue(this.id).subscribe(      // pass values fetched from URL in subscribe()
      (resp:any) => this.issue = resp,
      err => console.log(err));
    }

  ngOnInit() {
      this.route.params.forEach((params: Params) => {
      this.id = +params['id'];
  });
      this._issueService.getIssue(this.id).subscribe(  // pass values fetched from URL in subscribe()
        (resp:any) => this.issue = resp,
        err => console.log(err));

        var now = new Date();

      var day = now.getDate();
      var month = now.getMonth() + 1;

      var dayval = "";
      var monthval="";

      if(day<10) dayval = "0" + day;
      else dayval = day + "";

      if(month<10) monthval = "0" + month;
      else monthval = month + "";
    
      var today = now.getFullYear() + "-" + (monthval) + "-" + (dayval);
    
      document.getElementById("datecr").setAttribute('disabled','true');
    
      document.getElementById("daters").setAttribute('min',today);
  }

  onSubmit(formValue: any){
    let updatedissue = {
          id: this.id,
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