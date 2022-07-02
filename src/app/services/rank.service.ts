import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rank } from '../models/rank.model';

@Injectable({
  providedIn: 'root'
})
export class RankService {

  readonly rankURL = "https://documentrequestapp.azurewebsites.net/api/rank/";

  rank: Rank = {
    id: '',
    name: ''
  }

  constructor(private http: HttpClient) { }

  //GET ranks
  getRanks(): Observable<Rank[]>{
    return this.http.get<Rank[]>(this.rankURL);
  }

  //ADD rank
  addRank(rank: Rank): Observable<Rank>{
    rank.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Rank>(this.rankURL, rank);
  }

  //edit rank
  updateRank(id: string, rank: Rank): Observable<Rank>{
    rank.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Rank>(this.rankURL + id, rank);
  }

  //remove rank
  removeRank(id: string): Observable<Rank>{
    return this.http.delete<Rank>(this.rankURL + id);
  }

  private _rank = new BehaviorSubject<Rank>(this.rank);
  getRank = this._rank.asObservable();

  setRank(rank: any){
    this._rank.next(rank);
  }
}
