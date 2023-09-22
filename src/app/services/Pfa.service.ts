import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pfa } from '../models/Pfa';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class PFAService {

  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getPFA_ZNList(): Observable<Pfa[]> {
    return this.http.get(this.apiUrl+"pfa").pipe(
      map((response: any) => response.data)
    );
  }
  exportAsExcelFile(data: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  updatePfa(idpfa: number, note: string, annee: number): Observable<Pfa> {
    const url = `${this.apiUrl}pfa/${idpfa}`;
    const body = { note, annee };
    return this.http.put(url, body).pipe(
      map((response: any) => response.data)
    );
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }



}
