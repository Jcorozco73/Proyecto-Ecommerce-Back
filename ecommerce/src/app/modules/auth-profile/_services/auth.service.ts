import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_FRONTEND, URL_SERVICIOS } from 'src/app/config/config';
import {catchError, map} from 'rxjs/operators'
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

user: any = null
token: any = null

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.getLocalStorage()
  }
getLocalStorage(){
  if(localStorage.getItem("token")) {
    this.token = localStorage.getItem("token")
    this.user = JSON.parse(localStorage.getItem("user") ?? "")

  }else{
    this.token = null
    this.user = null
  }

}
  login( email:string, password: string){
  let URL = URL_FRONTEND +"user/login"
  return this.http.post(URL, {email, password}).pipe(
    map((resp:any) => {
      if(resp.USER_FRONTEND && resp.USER_FRONTEND.token){
        return this.localStorageSave(resp.USER_FRONTEND)
        //almacena el token
      }else {
        //devuelve el status
        return resp
      }

    }),
    catchError((error: any) =>{
      console.log(error)
      return of (error)
    })
  )
}
localStorageSave(USER_FRONTEND: any){
  localStorage.setItem('token', USER_FRONTEND.token)
  localStorage.setItem('users', JSON.stringify(USER_FRONTEND.user))
  return true
}

register(data: any) {
  let URL = URL_SERVICIOS +"user/register"
  return this.http.post(URL, data)

}

logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('users')
  this.router.navigate(['auth/login'])

}

  }


