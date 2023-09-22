
import { ListeComponent } from './liste/liste.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/auth/login/login.component';
import { PfaComponent } from './pfa/pfa.component';
import { ImpressionComponent } from './impression/impression.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: 'full'  },
  { path: 'pfas', component: PfaComponent },
  { path: 'liste', component: ListeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'impression', component: ImpressionComponent },
  // { path: '', component: LoginComponent },
  // Autres routes de l'application...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }
