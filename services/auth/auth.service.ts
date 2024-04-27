import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserstorageService } from './storage/userstorage.service';

const BASIC_URL = "http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient,
    private userStorageService: UserstorageService) { }

  register(signupRequest:any): Observable<any> {
    return this.http.post(BASIC_URL + "sign-up", signupRequest)

  }

  login(username: string, password:string): any {
    const headers=new HttpHeaders().set('Content-Type', 'application/json');
    const body= {username, password};

    return this.http.post(BASIC_URL + 'authenticate', body, {headers, observe: 'response'}).pipe(
      map((res) =>{
        const token=res.headers.get('authorization').substring(7); //get token without the starting string "bearer"
        const user=res.body;
        if(token && user){
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;


        }
        return false;  //if token & user dont exist return false
      })
    )

  }


}
   