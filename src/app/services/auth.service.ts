import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../components/models/user.model';

import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    //Create a new user
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey='AIzaSyCfjHA1nB6yTk6eVev245YUGeCx1HHS86o';
  userToke:string;
  constructor( private http:HttpClient) { 
    this.readToken();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  //User Login
  login(user : UserModel){
    
    const authData = {
      email:user.email,
      password:user.password,
      returnSecureToken: true
    };   

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apiKey}`,
      authData,
    ).pipe(
      map(result=>{
        this.SaveToken(result['idToken']);
        return result;
      })
    );
  }
  // Creating a new User
  newuser(user:UserModel) {
    const authData = {
      email:user.email,
      password:user.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}signUp?key=${this.apiKey}`,
      authData,
    ).pipe(
      map(result=>{
        this.SaveToken(result['idToken']);
        return result;
      })
    );
  }
  //Save Token
  private SaveToken(idToken:string){
    this.userToke = idToken;
    localStorage.setItem('token',idToken);

    let today = new Date();
    today.setSeconds(3600);

    localStorage.setItem('expiration', today.getTime().toString());

  }

  //Read token
  private readToken(){
    if (localStorage.getItem('token')) {
      this.userToke = localStorage.getItem('token');      
    }else{
      this.userToke='';
    }
    return this.userToke;
  }
   
  //Check Authenticate 
  //Validation token
  IsAuthenticatie():boolean{

    if (this.userToke.length < 2) {
      return false;
    }
     
    const expirationToken = Number(localStorage.getItem('expiration'));
    const expirationdate = new Date();
    expirationdate.setTime(expirationToken);
    
    if (expirationdate > new Date()) {
      return true;
    } else {
      return false;
    }    
  }
}
