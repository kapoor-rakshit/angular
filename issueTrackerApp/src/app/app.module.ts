import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }  from './app.routing';
import { IssueFilter } from './issuesComponent/issues.pipe';
import { IssuesComponent } from './issuesComponent/issuesComp';
import { IssueService } from './issuesComponent/issue_service';
import { AddIssue } from './issuesComponent/addissue';
import { HomeComponent } from './homeComponent/homeComp';
import { EditIssue } from './issuesComponent/editissue';

import 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    IssueFilter,
    IssuesComponent,
    AddIssue,
    HomeComponent,
    EditIssue
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing,
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
