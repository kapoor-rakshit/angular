import { Routes, RouterModule } from '@angular/router';
import {IssuesComponent} from './issuesComponent/issuesComp';
import { HomeComponent } from './homeComponent/homeComp';
import { AddIssue } from './issuesComponent/addissue';
import { EditIssue } from './issuesComponent/editissue';

const appRoutes:Routes = [
    {path:"", component:HomeComponent},
    {path:"issues", component:IssuesComponent},
    {path:"issues/addissue", component: AddIssue},
    {path:"issues/editissue/:id", component:EditIssue}
];

export const routing = RouterModule.forRoot(appRoutes);