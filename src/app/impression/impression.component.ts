


import { Naturef } from './../models/naturef';
import { Judiciaire } from './../models/judiciaire';
import { Unite } from './../models/unite';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Demande } from 'src/app/models/demande';
import { MyService } from 'src/app/services/my.service';
import { Variables } from 'src/app/variables';
import { Table } from 'primeng/table';
import { Pfa } from '../models/Pfa';
import { Note } from './../models/note';
import { Grade } from './../models/grade';
import { Pfanote } from '../models/Pfanote';
import { DatePipe } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PFAService } from '../services/Pfa.service';
import { MessagesModule } from 'primeng/messages';
import { Fonction } from '../models/fonction';
import { Hierarchie } from '../models/hierarchie';
import { Appreciation } from '../models/appreciation';
import { Motif } from '../models/motif';
import { Autoritef } from '../models/autoritef';
import { Evaluation } from '../models/Evaluation';
import { Pfanote_mat } from '../models/pfanote_mat';
import { Pfaimp } from '../models/pfaimp';
@Component({
  selector: 'app-impression',
  templateUrl: './impression.component.html',
  styleUrls: ['./impression.component.css']
})
export class ImpressionComponent implements OnInit {
  pfa_notemat: Pfanote_mat[];

  msgs: Message[] = [];
  pfas: Pfa[];
  evaluations: Evaluation[];
  motifs: Motif[];
  pfa_note: Pfanote[];

  pfa_imp: Pfaimp[];
  grades: Grade[];
  appreciations: Appreciation[];
  naturesf: Naturef[];
  autoritesf: Autoritef[];
  judiciaires: Judiciaire[];
  unites: Unite[];
  uniteU: Unite[];
  fonctions: Fonction[];
  hierarchies: Hierarchie[];
  notem: Note;
  previousObjet: any;
  previousIntitule:any;
  // libellem:string;
  libelle: string;
  idevaluation:number;
  note_evaluation: number;
  date_debut: Date;
  date_fin: Date;
  date_jugement: Date;
  HOSP: number;
  TS: number;
  PTC: number;
  degre:string;
  libelle_fonction:string;
  libelle_evaluation:string;
  totalNotes: number = 0;
  libelle_appreciation:string;
  abreviation: string;
  matricule: string;
  unite_id:number;
  note_globale: number;
  id: number;
  idpfa: number;
  nom: string;
  annee: number;
  prenom: string;
  autorite: string;
  judiciaire:string;
  motif:string;
  disciplinaire:string;
  // nature:string;
  appreciation: string;
  displayDialog: boolean = false;
  displayDialog2: boolean = false;
  action: string;
  q:string;


  formattedDate: string;
  v: Variables;
  currentYear = new Date().getFullYear();


  constructor(
    private p: Variables,

    private router: Router
  ) {
    this.v = p;
  }
  ngOnInit(): void {
    if (this.v.user.id == null) {
      this.router.navigate(['/login']);
    }


  }
  calculateTotalNotes(): number {
    let total = 0;
    if(this.v.impressions){}
    this.v.impressions.forEach(objet => {
      if (objet.total) { // Vérifie si la valeur de 'total' existe
        total += objet.total;
      }
    });
    return total;
  }

  calculateTotalNotestotal(): number {
    let total = 0;
    if(this.v.impressions){
          this.v.impressions.forEach(objet => {
      if (objet.total) { // Vérifie si la valeur de 'total' existe
        total += objet.total;
      }
    });
    }

    return total/20;
  }
}
