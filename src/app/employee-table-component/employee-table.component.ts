import { Employee } from '../employee';
import { ExcelService } from '../excel-service.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-employee-table',
  template: `
    <button (click)="exportToExcel()">Export to Excel</button>
    <table>
      <thead>
        <tr>
          <th>{{ model.matricule }}</th>
          <th>{{ model.nom }}</th>
          <th>{{ model.prenom }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees">
          <td>{{ employee.matricule }}</td>
          <td>{{ employee.nom }}</td>
          <td>{{ employee.prenom }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
  `]
})
export class EmployeeTableComponent {

  employees: Employee[] = [
    { matricule: '001', nom: 'Dupont', prenom: 'Jean' },
    { matricule: '002', nom: 'Martin', prenom: 'Pierre' },
    { matricule: '003', nom: 'Durand', prenom: 'Marie' }
  ];
  model = { matricule: 'Matricule', nom: 'Nom', prenom: 'Prénom' };

  constructor(private ExcelService: ExcelService) { }
  exportToExcel(): void {
    this.ExcelService.exportToExcel<Employee>(this.employees, 'employees', this.model);
  }


}
