import { Naturef } from './../models/naturef';
import { Pfanote } from './../models/Pfanote';
import { User } from './../models/user';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Gestion } from '../models/gestion';
import { Unite } from '../models/unite';
import { Profil } from '../models/profil';
import { Pfa } from '../models/Pfa';
import { Demande } from '../models/demande';
import { Note } from '../models/note';
import { Grade } from '../models/grade';
import { Fonction } from '../models/fonction';
import { Hierarchie } from '../models/hierarchie';
import { Appreciation } from '../models/appreciation';
import { Motif } from '../models/motif';
import { Judiciaire } from '../models/judiciaire';
import { Autoritef } from '../models/autoritef';
import { Evaluation } from '../models/Evaluation';
import { Pfanote_mat } from '../models/pfanote_mat';
import { Pfaimp } from '../models/pfaimp';
import { Impression } from '../models/Impression';

@Injectable()
export class MyService {
  uri: string = "http://127.0.0.1/notation_back/public/api/"; // L'URL de l'API

  status: string[] = ["OUTOFSTOCK", "INSTOCK", "LOWSTOCK"]; // Un tableau de statuts

  constructor(private http: HttpClient) {}

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Observable pour le statut de connexion
  profileID: number = 0;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Fonction de connexion
  login(user: User) {
    return this.http.post<User[]>(this.uri + 'login', user).toPromise();
  }

  // Fonction de déconnexion
  logout() {
    this.loggedIn.subscribe();
    // return this.http.post(this.uri +'logout', {token: localStorage.getItem('my-token')});
  }

  // Récupérer les gestions
  getGestions() {
    return this.http.get<Gestion[]>(this.uri + 'gestions').toPromise();
  }

  // Récupérer les profils
  getProfils() {
    return this.http.get<Profil[]>(this.uri + 'ListProfil').toPromise();
  }

  // Récupérer les PFAs
  getPfas() {
    return this.http.get<any>(this.uri + "ListPfa").toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data });
  }

  getMotifs() {
    // return this.http.get<any>(this.uri + "motif").toPromise()
    //   .then(res => <any[]>res.data)
    //   .then(data => { return data });

      return this.http.get<Motif[]>(this.uri + 'motif').toPromise();
  }

  getAutoritesf() {
    // return this.http.get<any>(this.uri + "motif").toPromise()
    //   .then(res => <any[]>res.data)
    //   .then(data => { return data });

      return this.http.get<Autoritef[]>(this.uri + 'autoritefel').toPromise();
  }

  getNaturesf() {
    // return this.http.get<any>(this.uri + "motif").toPromise()
    //   .then(res => <any[]>res.data)
    //   .then(data => { return data });

      return this.http.get<Naturef[]>(this.uri + 'naturefel').toPromise();
  }

  getJudiciaires() {
    // return this.http.get<any>(this.uri + "motif").toPromise()
    //   .then(res => <any[]>res.data)
    //   .then(data => { return data });

      return this.http.get<Judiciaire[]>(this.uri + 'judiciaire').toPromise();
  }
  getEvaluations() {
    // return this.http.get<any>(this.uri + "motif").toPromise()
    //   .then(res => <any[]>res.data)
    //   .then(data => { return data });

      return this.http.get<Evaluation[]>(this.uri + 'evaluation').toPromise();
  }

  // Récupérer la liste des PFAs
  getPFA_ZNList(idunite: string) {
    return this.http.get<any>(this.uri + "pfa" + idunite).toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data });
  }

  // Récupérer les notes des PFAs
  getPFA_Note(idpfa: String) {
    return this.http.get<Pfanote[]>(this.uri + 'notepfa' + idpfa).toPromise();
  }

  getPFA_NoteMat(idpfa: String ,annee: String) {
    return this.http.get<Pfanote_mat[]>(this.uri + 'notepfamat' + idpfa + '&annee' + annee).toPromise();
  }

  // saoud
  getPFANotes(idpfa: String ,annee: String) {
    return this.http.get<Impression[]>(this.uri + 'PfaNotes' + idpfa + '&annee' + annee).toPromise();
  }



  getPFA_imp(idpfa: String ,annee: String) {
    return this.http.get<Pfaimp[]>(this.uri + 'pfaimp' + idpfa + '&annee' + annee).toPromise();
  }
  // getPFA_NoteMat(idpfa: String, annee: String) {
  //   return this.http.get<Pfanote_mat[]>(this.uri + 'notepfamat?idpfa=' + idpfa + '&annee=' + annee).toPromise();
  // }

  // getPFA_NoteMat(query: String ) {

  //   return this.http.get<Pfanote_mat[]>(this.uri + query).toPromise();
  // }

  // Récupérer les demandes
  getDemandes() {
    return this.http.get<Demande[]>(this.uri + 'DemandeComptes').toPromise();
  }

  // Ajouter une note
  addNote(note: Note) {
    return this.http.post<Note>(this.uri + 'note', note).toPromise();
  }

  // Mettre à jour une note
  updateNote(note: Note) {
    return this.http.put<Note>(this.uri + 'note/' + note.id, note).toPromise();
  }

  // Récupérer les grades
  getGrade() {
    return this.http.get<any>(this.uri + "grade").toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data });
  }

  // Récupérer les grades
  getGrades() {
    return this.http.get<Grade[]>(this.uri + 'grade').toPromise();
  }

  // Récupérer les fonctions
  getFonction() {
    return this.http.get<Fonction[]>(this.uri + 'fonction').toPromise();
  }
// Récupérer les fonctions
  getAppreciation() {
    return this.http.get<Appreciation[]>(this.uri + 'appreciation').toPromise();
  }

  getHierarchie() {
    return this.http.get<Hierarchie[]>(this.uri + 'hierarchie').toPromise();
  }
  // Récupérer les unités
  getUnites() {
    return this.http.get<Unite[]>(this.uri + 'unite').toPromise();
  }

  // Supprimer une note
  deleteNote(note: Note) {
    return this.http.delete<Note>(this.uri + 'note/' + note.id).toPromise();
  }

  changePassword(query: string, user: any) {
    return this.http
      .post<number>(this.uri + "changePassword" + query, user)
      .toPromise();
  }
}
