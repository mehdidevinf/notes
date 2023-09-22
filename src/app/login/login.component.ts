import { MyService } from './../../../services/my.service';
import { Router } from '@angular/router';
import {  Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Variables } from 'src/app/variables';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.Component.css']
})
export class LoginComponent implements OnInit {
   v:Variables;
   login:Login;
   user:User;

   selectedFile: File = null;
   imageUrl: string;
   fileToUpload: File = null;
   saveFileForm: any;
   lstFileDetails: any;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(null),
  })

  constructor(private p:Variables, private router: Router, private service: MyService, private formBuilder: FormBuilder) {
    this.v=p;
   }

  ngOnInit() {
   this.user = new User();
  }
  loginUser()  {
if(this.user.login.length > 0){
  this.v.user= new User;

    this.service.login(this.user)
        .then(
           res => {
            this.v.user= <User> res[0];
           },
           err =>  this.service.logout(),

        ).then(f=>
          {
             if(this.v.user.id>0){
                 this.v.loged= true;
                //  localStorage.setItem('my-token', ''+this.v.user.id);
                 fetch(`${ this.service.loggedIn.next(true)}`).then(
            ).then(f=>  {
              this.router.navigate(['/acceuil']);
              // if(this.v.user.profile_id==0){
              //   this.router.navigate(['/situation'])
              // }else{
              //   this.router.navigate(['/home'])
              // }
            })
          }

         }


        );
}

  }





}
