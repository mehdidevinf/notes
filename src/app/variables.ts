import { Autoritef } from './models/autoritef';
import { Impression } from './models/Impression';

import { Pfanote_mat } from './models/pfanote_mat';
import { User } from './models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class Variables {
    societe:string =" ";
    adresse:string =" ";
    telephone=" ";
    fax:string=" ";
    mail:string="  ";
    parametre: string = ' ';
    idImpression: number=0;
    typeImpression: string = ' ';
    phraseImpression: string = '  ';
    se:number=1;
    user:User;
    code_liv_sor:number;
    code_sort:number;

    totalSortie:number;
    creditGlobal:number;
    totalSortieLettre:String;
    tva:number=0;
    ht:number=0;

    module:String;
    duplicata: string ='';
    total_operation:number;
    total_reglement:number;
    reste_credit:number;
    total_reg;

    formation:string=' ';
    loged:boolean=false;
    scrHeight:any;
    scrWidth:any;

    sous_secteur:String;
    matricule:  string;
    pfa_notemats: Pfanote_mat[];
    impressions: Impression[];
    impression: Impression;
    pfanoteSelected:  Pfanote_mat;
    annee:  number;
    disciplinaire: number;
    jugement: string;
    autoritef :string;
    naturef:string;
    grade:  string;
    unite:  string;
    origine:  string;
    ville:  string;
    PTC:number;
    nom:  string;
    prenom:  string;
    DATENAISS:Date;
    DATERECRUTEMENT :Date;
    DATENOMINATION:Date;
    date_debut :Date;
    date_fin:Date;
    fonctionpfa:string;
    intitule:string;
    libelle_evaluation:string;
    coeffession:number;
    total:number;
    constructor(){

        this.user= new User;
        this.user=new User;
        this.impression= new Impression();
    }
     getNum(val) {
        if (isNaN(val)) {
          return 0;
        }
        if (val+''.length==0) {
            return 0;
          }
        return val;
     }

    floatNumber(number: number){
      if(number != null){

        return Number( Number(number).toFixed(2).toString().replace(',',' '));
      }else{
        return 0;
      }


    }
    compare(par1,operateur,par2) {
        var val1 = parseInt(par1);
        var val2 = parseInt(par2);

        if (operateur =='>'){
            if(val1 > val2) {
                    return true;
                } else {
                    return false;
                }
        }
        if (operateur =='>='){
          if(val1 >= val2) {
                  return true;
              } else {
                  return false;
              }
      }
        if (operateur =='<'){
          if(val1 < val2) {
                  return true;
              } else {
                  return false;
              }
      }
      if (operateur =='<='){
        if(val1 <= val2) {
                return true;
            } else {
                return false;
            }
    }
    if (operateur =='=='){
      if(val1 == val2) {
              return true;
          } else {
              return false;
          }
    }

    }


    Unite( nombre ){
        var unite;
        switch( nombre ){
            case 0: unite = "zéro";		break;
            case 1: unite = "un";		break;
            case 2: unite = "deux";		break;
            case 3: unite = "trois"; 	break;
            case 4: unite = "quatre"; 	break;
            case 5: unite = "cinq"; 	break;
            case 6: unite = "six"; 		break;
            case 7: unite = "sept"; 	break;
            case 8: unite = "huit"; 	break;
            case 9: unite = "neuf"; 	break;
        }//fin switch
        return unite;
    }//-----------------------------------------------------------------------

     Dizaine( nombre ){
        var dizaine;
        switch( nombre ){
            case 10: dizaine = "dix"; break;
            case 11: dizaine = "onze"; break;
            case 12: dizaine = "douze"; break;
            case 13: dizaine = "treize"; break;
            case 14: dizaine = "quatorze"; break;
            case 15: dizaine = "quinze"; break;
            case 16: dizaine = "seize"; break;
            case 17: dizaine = "dix-sept"; break;
            case 18: dizaine = "dix-huit"; break;
            case 19: dizaine = "dix-neuf"; break;
            case 20: dizaine = "vingt"; break;
            case 30: dizaine = "trente"; break;
            case 40: dizaine = "quarante"; break;
            case 50: dizaine = "cinquante"; break;
            case 60: dizaine = "soixante"; break;
            case 70: dizaine = "soixante-dix"; break;
            case 80: dizaine = "quatre-vingt"; break;
            case 90: dizaine = "quatre-vingt-dix"; break;
        }//fin switch
        return dizaine;
    }//-----------------------------------------------------------------------

     NumberToLetter( nombre ){
        var i, j, n, quotient, reste, nb ;
        var ch
        var numberToLetter='';
        //__________________________________

        if(  nombre.toString().replace( / /gi, "" ).length > 15  )	return "dépassement de capacité";
        if(  isNaN(nombre.toString().replace( / /gi, "" ))  )		return "Nombre non valide";

        nb = parseFloat(nombre.toString().replace( / /gi, "" ));
        if(  Math.ceil(nb) != nb  )	return  "Nombre avec virgule non géré.";

        n = nb.toString().length;
        switch( n ){
             case 1: numberToLetter = this.Unite(nb); break;
             case 2: if(  nb > 19  ){
                           quotient = Math.floor(nb / 10);
                           reste = nb % 10;
                           if(  nb < 71 || (nb > 79 && nb < 91)  ){
                                 if(  reste == 0  ) numberToLetter = this.Dizaine(quotient * 10);
                                 if(  reste == 1  ) numberToLetter = this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
                                 if(  reste > 1   ) numberToLetter = this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
                           }else numberToLetter = this.Dizaine((quotient - 1) * 10) + "-" + this.Dizaine(10 + reste);
                     }else numberToLetter = this.Dizaine(nb);
                     break;
             case 3: quotient = Math.floor(nb / 100);
                     reste = nb % 100;
                     if(  quotient == 1 && reste == 0   ) numberToLetter = "cent";
                     if(  quotient == 1 && reste != 0   ) numberToLetter = "cent" + " " +this. NumberToLetter(reste);
                     if(  quotient > 1 && reste == 0    ) numberToLetter = this.Unite(quotient) + " cents";
                     if(  quotient > 1 && reste != 0    ) numberToLetter = this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
                     break;
             case 4 :  quotient = Math.floor(nb / 1000);
                          reste = nb - quotient * 1000;
                          if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
                          if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille";
                          if(  quotient > 1 && reste != 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
                          break;
             case 5 :  quotient = Math.floor(nb / 1000);
                          reste = nb - quotient * 1000;
                          if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
                          if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille";
                          if(  quotient > 1 && reste != 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
                          break;
             case 6 :  quotient = Math.floor(nb / 1000);
                          reste = nb - quotient * 1000;
                          if(  quotient == 1 && reste == 0   ) numberToLetter = "mille";
                          if(  quotient == 1 && reste != 0   ) numberToLetter = "mille" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille";
                          if(  quotient > 1 && reste != 0    ) numberToLetter = this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
                          break;
             case 7: quotient = Math.floor(nb / 1000000);
                          reste = nb % 1000000;
                          if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
                          if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions";
                          if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
                          break;
             case 8: quotient = Math.floor(nb / 1000000);
                          reste = nb % 1000000;
                          if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
                          if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions";
                          if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
                          break;
             case 9: quotient = Math.floor(nb / 1000000);
                          reste = nb % 1000000;
                          if(  quotient == 1 && reste == 0  ) numberToLetter = "un million";
                          if(  quotient == 1 && reste != 0  ) numberToLetter = "un million" + " " + this.NumberToLetter(reste);
                          if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions";
                          if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
                          break;
             case 10: quotient = Math.floor(nb / 1000000000);
                            reste = nb - quotient * 1000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
                            break;
             case 11: quotient = Math.floor(nb / 1000000000);
                            reste = nb - quotient * 1000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
                            break;
             case 12: quotient = Math.floor(nb / 1000000000);
                            reste = nb - quotient * 1000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un milliard";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
                            break;
             case 13: quotient = Math.floor(nb / 1000000000000);
                            reste = nb - quotient * 1000000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
                            break;
             case 14: quotient = Math.floor(nb / 1000000000000);
                            reste = nb - quotient * 1000000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
                            break;
             case 15: quotient = Math.floor(nb / 1000000000000);
                            reste = nb - quotient * 1000000000000;
                            if(  quotient == 1 && reste == 0  ) numberToLetter = "un billion";
                            if(  quotient == 1 && reste != 0  ) numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
                            if(  quotient > 1 && reste == 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions";
                            if(  quotient > 1 && reste != 0   ) numberToLetter = this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
                            break;
         }//fin switch
         /*respect de l'accord de quatre-vingt*/
         if(  numberToLetter.substr(numberToLetter.length-"quatre-vingt".length,"quatre-vingt".length) == "quatre-vingt"  ) numberToLetter = numberToLetter + "s";

         return numberToLetter.toUpperCase();
    }
 }
