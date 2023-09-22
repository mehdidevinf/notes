import { MyService } from './../../../services/my.service';

import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Variables } from 'src/app/variables';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   v:Variables;
  isLoggedIn$: Observable<boolean>;
  profileID$:number;
  moduleNav:string;
  loged:boolean=false;
  constructor(private service: MyService, private router: Router, private p: Variables) {
    this.v=p;

   }

  ngOnInit() {
    this.loged = this.v.loged;
    this.isLoggedIn$ = this.service.isLoggedIn;
    this.profileID$= this.service.profileID;
    this.moduleNav='';
  }

  signOut() {
    this.v.user= new User;
    this.v.loged= false;
    localStorage.removeItem('my-token')
    this.router.navigate(['/login']).then(f=>this.service.loggedIn.next(false));
    this.moduleNav='login';

  }
  navigation(module:string){



    switch (module) {


      case 'pfas':
               this.moduleNav='pfas';
               module='pfas';
                  break;

    //   case 'situation':
    //               this.moduleNav='Situation';
    //               module='situation';
    //               break;
    //  case 'provinces':
    //                 this.moduleNav='Provinces';
    //                 module='provinces';
    //                 break;
        default:

  }
  this.router.navigate(['/'+ module]);
  }


}
