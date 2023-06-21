import { Component, OnInit } from '@angular/core';
import { Student, TestService } from '../test.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private testService:TestService) {}
  ngOnInit(): void {
    let arr = this.getAllStudents().subscribe(res=>{
      console.log(res);

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
