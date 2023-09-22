
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
import { Impression } from '../models/Impression';

@Component({
  selector: 'app-pfa-list',
  templateUrl: './pfa.component.html',
  styleUrls: ['./pfa.component.css']
})
export class PfaComponent implements OnInit {

  @ViewChild('searchInput') searchInput: ElementRef;
  dialogChangePassword: boolean = false;
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
  erreur: string = "";
  contentToPrint: any;

  paramPassword() {
    this.erreur = null;
    this.oldPassword = null;
    this.newPassword1 = null;
    this.newPassword2 = null;
    this.dialogChangePassword = false;
  }
  msgs: Message[] = [];
  pfas: Pfa[];
  evaluations: Evaluation[];
  motifs: Motif[];
  pfa_note: Pfanote[];
  pfa_notemat: Pfanote_mat[];
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
  origine:string;
  resetTable = false;
// Add this variable at the top of your component class
public isFieldsDisabled: boolean = false;

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
  disciplinaire:number;
  // nature:string;
  appreciation: string;
  displayDialog: boolean = false;
  displayDialog2: boolean = false;
  action: string;
  q:string;


  formattedDate: string;
  v: Variables;
  currentYear = new Date().getFullYear();

 evaluationSelected: Evaluation;
  pfaSelected: Pfa;
  pfa_noteimpSelected:Pfaimp;
  pfa_notematSelected:Pfanote_mat;
  selectedUnite: Unite;
  selectedJudiciaire: Unite;
  selectedAutoritef: Autoritef;
  selectedNaturef: Naturef;
  selectedMotif: Motif;
pfanoteSelected:  Pfanote_mat;
    //pfanoteSelected:  any;

  selectedGrade: Grade;
  selectedHierarchie: Hierarchie;
  selectedAppreciation: Appreciation;
  selectedFonction: Fonction;
  pfaEdited: Pfa;
  noteEdited: Note;
  visibleSidebar1: boolean = false;
  visibleSidebarsup:boolean = false;
  visibleSidebarimp:boolean = false;
  visibleSidebar2: boolean = false;
  pfaSidebarmodif: boolean = false;
  pfaSidebarajout: boolean = false;

  constructor(
    private pfaService: PFAService,
    private p: Variables,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private service: MyService,
    private router: Router
  ) {
    this.v = p;
    this.pfaSelected = new Pfa();
    this.pfaSelected.idpfa = 0;
    this.selectedUnite = new Unite();
  }

  filteredOptions: any[];
  matriculeFilter: string;

  filterOptions(event: any) {
    const query = event.target.value;
    this.filteredOptions = this.pfas.filter(option => option.matricule.toLowerCase().includes(query.toLowerCase()));
  }
  updatePassword() {
    debugger;
    if (
      this.oldPassword == this.v.user.password &&
      this.newPassword1 == this.newPassword2
    ) {
      this.v.user.password = this.newPassword1;
      this.service
        .changePassword("", this.v.user)
        .then((f) => {
          this.messageService.add({
            severity: "success",
            summary: " ",
            detail: "Mot de passe changé avec succès",
            life: 2000,
          });
          this.paramPassword();

        });
    } else {
      this.erreur =
        "Ancien mot de passe est incorrect ou le nouveau n'est pas identique";
    }
  }

  ngOnInit(): void {
    if (this.v.user.id == null) {
      this.router.navigate(['/login']);

    }

    // this.formattedDate = this.date_debut.toLocaleDateString('fr-FR');
    this.pfaSelected = new Pfa();
    this.pfanoteSelected = new Pfa();
    this.pfa_notematSelected = new Pfanote_mat();
    this.pfa_noteimpSelected = new Pfaimp();
    this.selectedAutoritef = new Autoritef();
    this.selectedNaturef = new Naturef();
    this.selectedJudiciaire = new Judiciaire();
    this.pfaEdited = new Pfa();
    this.noteEdited = new Note();
    this.selectedGrade = new Grade();
    //  this.selectedUnite = new Unite();
    this.selectedHierarchie= new Hierarchie();
    this.selectedAppreciation= new Appreciation();
    this.selectedFonction = new Fonction();
    this.pfaSelected.idpfa = 0;
    this.selectedMotif = new Motif();
    this.evaluationSelected = new Evaluation();
    this.getPFA_ZNList();
    this.getGrade();
    this.getUnite();
    this.getFonction();
    this.getNaturef();
    this.getAutoritef();
    this.getJudiciaire();
    this.getHierarchie();
    this.getPFA_Note();
    // this.getPFA_Note_Mat();
    this.getAppreciation();
    this.getMotif();
    this.getEvaluation();
    // this.getPFA_imp();
  }



  getPFA_ZNList() {
    if (this.v.user.profile_id == 1) {

      this.service.getPFA_ZNList('?idunite='+ this.v.user.unite_id).then(data => this.pfas = data);
    }
  }

  getEvaluation() {
    if (this.v.user.profile_id == 1) {
      this.service.getEvaluations().then(data => this.evaluations = data);
    }
  }

  getAutoritef() {
    if (this.v.user.profile_id == 1) {
      this.service.getAutoritesf().then(data => this.autoritesf = data);
    }
  }

  getNaturef() {
    if (this.v.user.profile_id == 1) {
      this.service.getNaturesf().then(data => this.naturesf = data);
    }
  }

  getJudiciaire() {
    if (this.v.user.profile_id == 1) {
      this.service.getJudiciaires().then(data => this.judiciaires = data);
    }
  }

  getPFA_Note() {
    //  this.getPFA_ZNList();
    this.pfa_note = null;

      this.service.getPFA_Note('?idpfa='+ this.pfaSelected.idpfa).then(data => {
        this.pfa_note = data;
        this.pfanoteSelected = this.pfa_note[0];

      });

  }

  getPFA_imp() {

    // this.getPFA_ZNList();
    this.pfa_note = null;

    this.service.getPFA_imp('?idpfa=' + this.pfa_noteimpSelected.idpfa  , '&annee=' + this.pfa_noteimpSelected.annee).then(data => {
      this.pfa_imp = data;

      this.pfa_noteimpSelected = this.pfa_imp[0];

    });

  }


  getPFA_Note_Mat() {

  // this.getPFA_ZNList();
  this.pfa_note = null;

  this.service.getPFA_NoteMat('?idpfa=' + this.pfanoteSelected.idpfa  , '&annee=' + this.pfanoteSelected.annee).then(data => {
    this.v.pfa_notemats = data;

    this.pfanoteSelected = this.v.pfa_notemats[0];

  });
}


  getGrade(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getGrades().then(data => this.grades = data);
    }
  }


  getMotif(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getMotifs().then(data => this.motifs = data);
    }
  }

  getAppreciation(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getAppreciation().then(data => this.appreciations = data);
    }
  }

  getUnite(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getUnites().then(data => this.unites = data);
    }
  }

  getFonction(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getFonction().then(data => this.fonctions = data);
    }
  }

  getHierarchie(): void {
    if (this.v.user.profile_id == 1) {
      this.service.getHierarchie().then(data => this.hierarchies = data);
    }
  }

  msg(msg:string){
    this.messageService.add({severity:'success', summary: 'Opération réussie', detail: msg, life: 7000});
  }
  editNote(objet: Pfanote_mat) {
    this.action = "edit";
    this.pfaEdited = new Pfa();
    this.pfanoteSelected = objet;
    Object.assign(this.pfaEdited, objet);

    this.evaluationSelected = this.evaluations.find(f=> f.id==objet.evaluation_id);
    this.note_evaluation = objet.note_evaluation;
    this.note_globale = objet.note_globale;
    this.annee = objet.annee;
    // this.note_evaluation = objet.note_evaluation;
    // this.note_evaluation = objet.note_evaluation;
    this.libelle_evaluation = objet.libelle_evaluation;
    // this.nom = objet.nom;
    // this.prenom = objet.prenom;
    // this.matricule = objet.matricule;
    this.libelle_appreciation = objet.libelle_appreciation;
    this.id = objet.id;

    this.pfaSidebarmodif = true;
  }

  supNote(objet: Pfa) {
    this.action = "sup";
    this.pfaEdited = new Pfa();
    Object.assign(this.pfaEdited, objet);
    this.getPFA_Note_Mat();
    // this.note_globale = objet.note_globale;
    // this.annee = objet.annee;
    // this.nom = objet.nom;
    // this.prenom = objet.prenom;
    // this.matricule = objet.matricule;
    // this.appreciation = objet.appreciation;
    // this.id = objet.id;

    this.visibleSidebarsup = true;
    this.getPFA_Note();
  }


  actualiser_notes(table: Table) {
    this.searchInput.nativeElement.value = '';
    table.clear();
    this.getPFA_ZNList();
  }

  nouvelle_note() {
    this.action = 'add';
    this.visibleSidebar1 = true;
    this.selectedUnite=null;
  }

  sup_note_matiere() {

    this.visibleSidebarsup = true;

  }

  exportToExcelprint(): void {
    this.pfaService.exportAsExcelFile(this.v.pfa_notemats, 'pfa_data');
  }

  exportToExcel(): void {
    this.pfaService.exportAsExcelFile(this.pfas, 'pfa_data');
  }

  validateNote() {
    if (this.note_globale > 20) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Note invalide',
        detail: 'La note ne peut pas dépasser 20.'
      });
    }
  }
  afficherMessage() {
    if (this.note_globale > 20) {
      console.log("La note est supérieure à 20");
      // Afficher le message ou effectuer d'autres actions
    }}

    ajoutNote(objet: Pfa) {
      this.action = "add";
      this.pfaEdited = new Pfa();
      Object.assign(this.pfaEdited, objet);
      this.note_globale = objet.note_globale;
      this.annee = objet.annee;
      this.nom = objet.nom;
      this.prenom = objet.prenom;
      this.matricule = objet.matricule;
      this.appreciation = objet.appreciation;
      this.id = objet.id;

      this.pfaSidebarmodif = true;
    }
    terminer() {

      this.visibleSidebar1 = false;
    }


  saveNotes() {
    debugger; // Ajout du point d'arrêt pour le débogage

    this.validateNote();
    if (this.action == 'add') {
      this.notem = new Note();
    }


    this.notem.annee = this.annee;
    this.notem.note_globale = this.note_globale;
    this.notem.note_evaluation = this.note_evaluation;
    this.notem.idpfa = this.pfaSelected.idpfa;
    this.notem.idhierarchie = this.selectedHierarchie.id;
    // this.notem.idunite = this.selectedUnite.id;
    this.notem.idmotif = this.selectedMotif.id;
    this.notem.idfonction = this.selectedFonction.id;
    this.notem.idappreciation = this.selectedAppreciation.id;
    this.notem.idautoritef = this.selectedAutoritef.id;
    this.notem.idnaturef = this.selectedNaturef.id;
    this.notem.idjudiciaire = this.selectedJudiciaire.id;
    this.notem.idevaluation = this.evaluationSelected.id;

    this.notem.PTC = this.PTC;
    this.notem.HOSP = this.HOSP;
    this.notem.TS = this.TS;

    this.notem.disciplinaire = this.disciplinaire;

    this.notem.date_jugement = this.date_jugement;
    this.notem.date_debut = this.date_debut;
    this.notem.date_fin = this.date_fin;

    if (this.action == 'add') {
      this.service.addNote(this.notem).then(() => {
        this.getPFA_ZNList();
        this.msg('Note enregistrée avec succès ! Veillez saisir la matière suivante ');

        // Disable fields after the first addition
        this.isFieldsDisabled = true;
      });
    } else if (this.action == 'edit') {
      this.service.updateNote(this.notem).then(() => {
        this.msg('Note a été modifiée avec succès');
        this.getPFA_ZNList();
      });
    }
  }


  deleteNote(objet :Note){
    this.confirmationService.confirm({
      message: 'Etes vous sûr vouloir supprimer cette Note:  ' + objet.note_evaluation + '?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () =>
      {
        this.service.deleteNote(objet).then(data =>this.getPFA_Note_Mat())
       .then(
         f=> this.messageService.add({severity:'success', summary: 'Successful', detail: 'Note supprimé', life: 2000})
        )
      }
  });
}
isNoteInvalid(): boolean {
  return (this.note_evaluation !== null && (this.note_evaluation < 0 || this.note_evaluation > 20));
}

saveNote() {

    debugger; // Ajout du point d'arrêt pour le débogage

    this.validateNote();
    if (this.action == 'edit') {
      this.noteEdited = new Note();
    }

    // this.notem.annee = this.annee;
    this.noteEdited.id = this.pfaEdited.id;
    this.noteEdited.idpfa = this.pfaEdited.idpfa;
    this.noteEdited.annee = this.annee;
   this.noteEdited.idevaluation = this.evaluationSelected.id;
    this.noteEdited.note_evaluation = this.note_evaluation;
    this.noteEdited.origine = this.origine;
    // this.noteEdited.note_globale = this.note_globale;
    this.noteEdited.idappreciation = this.selectedAppreciation.id;
    // this.noteEdited.autorite = this.autorite;

    if (this.action === 'add') {
      this.service.addNote(this.noteEdited).then(() => {
        this.getPFA_ZNList();
        this.msg('Note enregistrée avec succès');

      });
    } else if (this.action === 'edit') {
      this.service.updateNote(this.noteEdited).then(() => {
        this.msg('Note a été modifiée avec succès');
        this.pfaSidebarmodif = false;
        this.getPFA_ZNList();


      });
    }

  }
  showDetails(objet: any) {
    this.pfaSelected = objet; // Ajoutez une propriété selectedObjet pour stocker l'objet sélectionné
    this.displayDialog = true; // Ouvre la fenêtre modale
  }

  showPass() {
    // this.pfaSelected = objet; // Ajoutez une propriété selectedObjet pour stocker l'objet sélectionné
    this.dialogChangePassword= true; // Ouvre la fenêtre modale
  }
  // printDetails(objet: any) {
  //   this.pfaSelected = objet; // Ajoutez une propriété selectedObjet pour stocker l'objet sélectionné
  //   this.displayDialog2 = true; // Ouvre la fenêtre modale
  // }
  printDetails(objet: Impression) {

   Object.assign(this.pfanoteSelected, objet);

  this.v.annee = this.pfanoteSelected.annee;
  this.v.nom = this.pfanoteSelected.nom;
  this.v.prenom = this.pfanoteSelected.prenom;
  this.v.grade = this.pfanoteSelected.grade;
  this.v.matricule = this.pfanoteSelected.matricule;
  this.v.origine = this.pfanoteSelected.origine;
  this.v.DATENAISS = this.pfanoteSelected.DATENAISS;
  this.v.DATENOMINATION = this.pfanoteSelected.DATENOMINATION;
  this.v.DATERECRUTEMENT = this.pfanoteSelected.DATERECRUTEMENT;
  this.v.PTC = this.pfanoteSelected.PTC;
  this.v.ville = this.pfanoteSelected.ville;
  this.v.date_debut = this.pfanoteSelected.date_debut;
  this.v.date_fin = this.pfanoteSelected.date_fin;
  this.v.ville = this.pfanoteSelected.ville;
  this.v.disciplinaire = this.pfanoteSelected.disciplinaire;
  this.v.autoritef = this.pfanoteSelected.autoritef;
  this.v.naturef = this.pfanoteSelected.naturef;
  this.v.jugement = this.pfanoteSelected.jugement;
  console.log(this.pfanoteSelected.ville)
      this.service.getPFANotes('?idpfa=' + this.pfanoteSelected.idpfa  , '&annee=' + this.pfanoteSelected.annee)
      .then(data=> this.v.impressions = data);
        setTimeout(() => {
          window.print();
         }, 2000);

  }


evaluation(intitule:string){

  return this.v.pfa_notemats.filter(f=> f.intitule ==intitule);

}
imprimerNote(){
  window.print();

  this.v.idImpression = 2;
  // this.v.myDate = this.datePipe.transform(new Date(), "dd/MM/yyyy H:mm:ss");

  if (this.v.pfa_notemats != null) {
    setTimeout(() => {
     window.print();
    }, 2000);
  }
}
resetForm() {
  this.annee = null;
  this.libelle = null;
  this.selectedFonction = null;
  this.selectedHierarchie = null;
  this.selectedAppreciation = null;
  this.PTC = null;
  this.HOSP = null;
  this.TS = null;
  this.selectedMotif = null;
  this.date_debut = null;
  this.date_fin = null;
  this.disciplinaire = null;
  this.selectedJudiciaire = null;
  this.date_jugement = null;
  this.selectedAutoritef = null;
  this.selectedNaturef = null;
  this.evaluationSelected = null;
  this.note_evaluation = null;
  this.isFieldsDisabled = false;
  // Réinitialisez d'autres champs si nécessaire
}

}
