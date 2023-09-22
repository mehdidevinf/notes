import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  constructor(private http: HttpClient) { }

  callApi1() {
    this.http.get('http://localhost:4200/pfas_zn').subscribe(response => {
      console.log(response);
    });
  }

  callApi2() {
    this.http.get('https://api.example.com/api2').subscribe(response => {
      console.log(response);
    });
  }

  callApi3() {
    this.http.get('https://api.example.com/api3').subscribe(response => {
      console.log(response);
    });
  }

}
