import {Component, OnInit} from '@angular/core';
import {Employee} from "./employee";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./employee.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'employeemanagerapp';

  public employees: Employee[] | undefined; // entity
  public editEmployee: Employee; // untuk menangani method edit
  public deleteEmployee: Employee; // untuk menangani method delete


  constructor(private employeeService: EmployeeService) {
    this.employees = [];
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  // getAll
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // insert
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response); // akan return hasil add
        this.getEmployees(); // setelah add akan return getAll
        addForm.reset(); // ini akan reset tombol add.. form akan di perbarui
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  // update
  public onUpdateEmployee(employee: Employee): void {

    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response); // akan return hasil update
        this.getEmployees(); // setelah update akan return getAll
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  // delete
  public onDeleteEmployee(employeeId: number): void {

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response); // tidak akan mengablikan hasil.. karna void
        this.getEmployees(); // setelah delete return getAll
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }

    /**
     * kita melakukan looping. const employee equals employees entity
     * cek kondisi employee.name, employee.jobTitle, employee.email, employee.phone convert to lowercase
     * dengan indexOf masukan key convert to lowercase
     * tidak sama dengan -1 maka datanya ada!!
     * hasil akan di pust()
     */
  }

  // modal yang baru
  public onOpenModal(employee: Employee, mode: string): void{
      const container = document.getElementById('main-container')!; // id div<container>
      const button = document.createElement('button');  // ini akan membata tag <button> modal
      button.type = 'button'; // set type tag
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal'); // ini akan membaca tag <button attribute didalamnya> modal
      // set data-target modal ke id modal. mengunakan percabangan
      if (mode === 'add'){
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if (mode === 'edit'){
        this.editEmployee = employee;
        button.setAttribute('data-target', '#updateEmployeeModal');
        /**
         * ketika klik edit maka akan menjalankana modal ini
         * ingin mengatur employee dengan benar dan hanya akan mengatakan ini, yang akan menedit employee
         *  this.editEmployee = employee; sama dengan public onOpenModal(employee: Employee, mode: string)
         *  saat looping klik tombol edit kita akan set editEmployee. kita bisa binding dengan di form edit employee
         */
      }
      if (mode === 'delete'){
        this.deleteEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container.appendChild(button);
      button.click();

  }



}
