import { Director } from './../models/director.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  readonly directorURL = "https://localhost:7018/api/director/";

  director: Director = {
    id: '',
    name: ''
  }

  constructor(
    private http: HttpClient
  ) { }

  //GET directors
  getDirectors(): Observable<Director[]>{
    return this.http.get<Director[]>(this.directorURL);
  }

  //ADD director
  addDirector(director: Director): Observable<Director>{
    director.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Director>(this.directorURL, director);
  }

  //edit director
  updateDirector(id: string, director: Director): Observable<Director>{
    director.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<Director>(this.directorURL + id, director);
  }

  //remove director
  removeDirector(id: string): Observable<Director>{
    return this.http.delete<Director>(this.directorURL + id);
  }

  private _director = new BehaviorSubject<Director>(this.director);
  getDirector = this._director.asObservable();

  setDirector(director: any){
    this._director.next(director);
  }
}
