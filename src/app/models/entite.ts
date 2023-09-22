import { Lot } from './lot';
import { CategorieGrade } from './categorieGrade';
export class Entite {
id?:number;
label?:string;
formation_id?:number;
fonction_id?:number;
mission_id?:number;
type_id?:number;
categorie_grade?:CategorieGrade;
categorie_grade_id?:number;
categorie_grade_libelle?:string;
expandedIcon?:string;
collapsedIcon?:string;
tri?:number;
deleted?:number=0;
off?:number=0;
s_off?:number=0;
off_sup?:number=0;
off_sub?:number=0;
s_off_sup?:number=0;
s_off_sub?:number=0;
pdr?:number=0;
total?:number=0;
dupliquer?:number=1;
lot?:Lot;
lot_id?:number;
lot_libelle?:string;
ted?:number=1;
nombre?:number=1;

hf_fixe:number=0;
hf_mobile:number=0;
vhf_fix:number=0;
vhf_mobile:number=0;
vhf_pp:number=0;
total_transmissions:number=0;

vehicule4x4:number=0;
fourgon:number=0;
camion:number=0;
engin_bercat:number=0;
ambulance:number=0;
minibus_scolaire:number=0;
total_vehicule:number=0;

pa:number=0;
pm:number=0;
total_armement_letal:number=0;

fusil_l6:number=0;
cougar:number=0;
chotgun:number=0;
total_armement_anti_emeute:number=0;

pc_portable:number=0;
ordinateur_bureau:number=0;
imprimante:number=0;
video_projecteur:number=0;
firewall:number=0;
scanner:number=0;
total_informatique:number=0;


  constructor(){
this.id=0;
this.expandedIcon='pi pi-circle-on';
this.collapsedIcon='pi pi-circle-on';
this.dupliquer =1;
   }
}

