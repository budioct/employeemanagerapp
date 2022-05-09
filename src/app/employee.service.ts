import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]>{

    return this.http.get<Employee[]>(`${this.apiServerUrl}/api/v1/employees`); // endpoint harus mengikuti endpoint dari api
  }

  public addEmployee(employee: Employee): Observable<Employee>{

    return this.http.post<Employee>(`${this.apiServerUrl}/api/v1/employees/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiServerUrl}/api/v1/employees/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/v1/employees/delete/${employeeId}`);
  }




}
