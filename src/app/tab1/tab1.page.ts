import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Student, TestService } from '../test.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  public data :any;

  constructor(private testService:TestService,private http:HttpClient) {}
  ngOnInit(): void {
    let arr = this.getAllStudents().subscribe(res=>{
      console.log(res);

    });
    let path = "https://reqres.in/api/users";

    this.http.get(path).subscribe(res=>{
      this.data = res;
      console.log(this.data);
    });
  }


  getAllStudents(){
   return this.testService.getStudent();
  }

  addStudent(){
     let s:Student={
       Name: 'Aditya',
       UCID: '53',
       department: 'MCA'
     };
    return this.testService.addStudent(s);
  }

async updateStudent(){
  let s:Student={
    Name: 'changed',
    UCID: '53',
    department: 'MCA' 
  };
  console.log("hitting delete")
  await this.testService.updateStudentByUcid('53',s);
}

 async deleteStudent(){
    console.log("hitting delete")
    await this.testService.deleteStudentByUcid('53');
  }
}
