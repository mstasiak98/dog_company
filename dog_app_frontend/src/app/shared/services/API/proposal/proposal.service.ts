import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProposalService {

  private baseUrl = 'http://127.0.0.1:8000/api'

  constructor(private http: HttpClient) { }

  makeProposal(data: any): Observable<any> {
    const proposalUrl = `${this.baseUrl}/makeProposal`;
    return this.http.post(proposalUrl, data);
  }
}
