import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

declare function alertDanger([]): any
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email: string = ""
    password: string = ""
  constructor(
    public authService: AuthService,
    public router: Router

    ) { }
    ngOnInit(): void{
      //console.log(this.authService.user)
      if(this.authService.user){
        this.router.navigate(['/'])
      }

    }
    login(){

      if(!this.email){
        alertDanger("Please enter email");

      }
      if(!this.password){
        alertDanger("Please enter password");

      }

      this.authService.login(this.email,this.password).subscribe((resp: any) =>{
        console.log(resp);
        //usuario ingreso con exito
        if(!resp.error && resp){
          this.router.navigate(['/'])
        } else{
          alertDanger(resp.error.message)
        }



      });
    }

}
