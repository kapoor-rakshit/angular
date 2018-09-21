import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class IssueService{
    private _issuesUrl = "http://localhost:3000/issues";     /* URL of JSON server */

    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };

    constructor (private _http: HttpClient) { }

    getIssues() {
        return this._http.get(this._issuesUrl);
    }

    getIssue(id){
        return this._http.get(this._issuesUrl+"/"+id);
    }

    addIssue(newIssue){
        return this._http.post(this._issuesUrl, newIssue, this.httpOptions);
    }

    updateIssue(updatedissue, id){
        let editIssueURL = `${this._issuesUrl}/${id}`;
        return this._http.put(editIssueURL, updatedissue, this.httpOptions);
    }

    deleteIssue(id) {
        let deleteIssueURL = `${this._issuesUrl}/${id}`;
        return this._http.delete(deleteIssueURL);
    }
}