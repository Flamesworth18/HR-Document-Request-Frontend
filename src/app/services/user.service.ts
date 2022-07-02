import { Request } from '../models/request.model';
import { CreateUpdateUser } from '../models/create-update-user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly userURL = "https://localhost:7018/api/users/";

  user:User = {
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    userName:'',
    dateStarted:'',
    passwordHash:'',
    passwordSalt:'',
    passwordResetToken:'',
    passwordTokenExpires:new Date(),
    sex:'',
    role:'',
    numberOfRequests: 0
  }

  constructor(
    private http: HttpClient
  ) { }

//#region  USER
  //GET users
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL)
  }

  //ADD user
  addUser(user: CreateUpdateUser): Observable<User>{
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<User>(this.userURL, user);
  }

  //edit user
  updateUser(id: string, user: CreateUpdateUser): Observable<User>{
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.http.put<User>(this.userURL + id, user);
  }

  //remove user
  removeUser(id: string): Observable<User>{
    return this.http.delete<User>(this.userURL + id);
  }

  private _user = new BehaviorSubject<User>(this.user);
  getUser = this._user.asObservable();

  setUser(user: any){
    this._user.next(user);
  }
//#endregion

//#region REQUEST

  //GET user requests
  getUserRequests(id: string): Observable<Request[]>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.get<Request[]>(this.userURL + id + '/' + 'requests');
  }

  //POST user request
  addUserRequest(id: string, request: Request): Observable<Request>{
    request.id = '00000000-0000-0000-0000-000000000000';
    request.status = "Pending";
    return this.http.post<Request>(this.userURL + id + '/' + 'requests', request);
  }

  //PUT user request
  updateUserRequest(id: string, request: Request): Observable<Request>{
    request.status = "Pending";
    return this.http.put<Request>(this.userURL + id + 'requests' + '/' + request.id, request);
  }

  //DELETE user request
  removeUserRequest(id: string, request: Request): Observable<Request>{
    return this.http.delete<Request>(this.userURL + id + 'request' + '/' + request.id);
  }

//#endregion
}

