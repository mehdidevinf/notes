

import { MyService } from '../../services/my.service';
import { Variables } from '../../variables';

import { Component, OnInit } from '@angular/core';
import { Gestion } from 'src/app/models/gestion';
import { FormControl, FormGroup } from '@angular/forms';
import { Unite } from 'src/app/models/unite';
import { Profil } from 'src/app/models/profil';
import { Pfa } from 'src/app/models/Pfa';
import { Demande } from 'src/app/models/demande';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Button } from 'primeng/button';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
v:Variables;
gestions: Gestion[];
gestionsSelected:Gestion;
unites: Unite[];
unitesSelected:Unite;
profils: Profil[];
profilsSelected:Profil;
pfasSelected:Pfa;
pfas: Pfa[];
unitePfas: Pfa[];
AppProfils:Profil[];
demandes: Demande[];
demandeSelected:Demande;
nom :string;
prenom :string;
nomUser :string;
motpass :string;
motpass2 :string;
btnsave:Button;
msgs: Message[] = [];

  constructor(private p:Variables, private service: MyService, private confirmationService: ConfirmationService, private messageService: MessageService) {
this.v=p;
   }

  ngOnInit() {
    this.gestionsSelected = new Gestion;
     this.getGestions();

     this.unitesSelected = new Unite;
     this.getUnites();

     this.profilsSelected = new Profil;
     this.getProfils();

     this.pfasSelected = new Pfa;
     this.getPfas();
     this.demandeSelected = new Demande;

  }
  getGestions(){
    this.service.getGestions().then(data => this.gestions = data);
  }

  getUnites(){
    this.service.getUnites().then(data => this.unites = data);
  }
  getProfils(){
    this.service.getProfils().then(data => this.profils = data);
  }
  getPfas(){
    this.service.getPfas().then(data => this.pfas = data);
  }
  getDemandes(){
    this.service.getDemandes().then(data => this.pfas = data);
  }
  onSubmit()
  {

  }
  compteForm = new FormGroup({
    inputPlateforme: new FormControl(""),
    inputFormation: new FormControl(""),
    inputMatricule: new FormControl(""),
    inputNom: new FormControl(""),
    inputPrenom: new FormControl(""),
    inputUtilisateur: new FormControl(""),
    inputProfil: new FormControl(""),
    inputMotpass: new FormControl(""),
    inputConfirmMotpass: new FormControl(""),
  });

  get inputPlateforme() {
    return this.compteForm.get("inputPlateforme");
  }
  get inputFormation() {
    return this.compteForm.get("inputFormation");
  }
  get inputNom() {
    return this.compteForm.get("inputNom");
  }
  get inputPrenom() {
    return this.compteForm.get("inputPrenom");
  }
  get inputUtilisateur() {
    return this.compteForm.get("inputUtilisateur");
  }
  get inputProfil() {
    return this.compteForm.get("inputProfil");
  }
  get inputMotpass() {
    return this.compteForm.get("inputMotpass");
  }
  get inputConfirmMotpass() {
    return this.compteForm.get("inputConfirmMotpass");
  }

  filtrerPfa()
  {
    this.unitePfas = this.pfas.filter(
      (f) => f.idunite == this.unitesSelected.id);
  }
  chargerPfa()
  {
    this.nom=this.pfasSelected.nom ;
    this.prenom= this.pfasSelected.prenom;
    this.nomUser=this.pfasSelected.prenom+'.'+this.pfasSelected.nom;
  }

  filtrerProfil()
  {
    this.AppProfils = this.profils.filter(
      (f) => f.application_id == this.gestionsSelected.id);
  }


  saveDemande()
  {  //console.log(this.gestionsSelected.id);
    if (this.motpass==this.motpass2 && this.motpass.length>=6  ) {
    this.demandeSelected.application_id=this.gestionsSelected.id;
    this.demandeSelected.unite_id=this.unitesSelected.id;
    this.demandeSelected.profil_id=this.profilsSelected.id;
    this.demandeSelected.pfa_id=this.pfasSelected.idpfa;
    this.demandeSelected.mot_pass=this.motpass;
    this.demandeSelected.phase_id='1';


    // this.service.addDemande(this.demandeSelected).then(data =>
    //   // this.de.unshift(data)
  {this.getDemandes();
    this.msg("Votre Demande a été envoyée avec succés");
    this.motpass=null;
    this.motpass2=null;
    // this.nomUser=null;
    // this.prenom=null;
    // this.nom=null;
  }

    } else {  this.msg2("les mots de passe saisis ne sont pas identiques");}

  }

  msg(msg:string){
    this.messageService.add({severity:'success', summary: 'Opération réussie', detail: msg, life: 3000});
  }

  msg2(msg:string){
    this.messageService.add({severity:'warn', summary: 'Opération échouée', detail: msg, life: 3000});
  }


}


