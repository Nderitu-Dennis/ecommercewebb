import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})

export class UserstorageService {
  static getToken: null;
  

  constructor() { }

  public saveToken(token: string):void{  //accept a token of type string
    window.localStorage.removeItem(TOKEN); //remove the existing token if there is in local storage
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void{
    window.localStorage.removeItem(USER); //remove existing user if they exist
    window.localStorage.setItem(USER,JSON.stringify(user));  //convert to a string rep that can easily be stored/transmitted over a network
  }

   getToken(): string{
    return localStorage.getItem(TOKEN);  //method to get token from local storage and return as string
  } 

  //method to get the user
  static getUser(): any{
    return JSON.parse(localStorage.getItem(USER));
  }

  //method to get the user id
  static getUserId(): string{
    const user = this.getUser();
    if(user==null){
      return '';
    }
    return user.userId;
  }


  //method to get the user role
  static getUserRole(): string{
    const user = this.getUser();
    if(user==null){
      return '';
    }
    return user.role;
  }


//check if logged in user is admin 
  static isAdminLoggedIn(): boolean {
    if(this.getToken === null){
      return false;
    }
    const role : string = this.getUserRole();
    return role == 'ADMIN';
  }


//check if logged in user is customer
static isCustomerLoggedIn(): boolean {
  if(this.getToken === null){
    return false;
  }
  const role : string = this.getUserRole();
  return role == 'CUSTOMER';
}

//signout method

static signOut(): void{
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(USER);

}




}
