import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, getDocs, query, QuerySnapshot, updateDoc, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';


export interface Student{
  Name:string,
  UCID:string,
  department:string,
}
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private firestore:Firestore) { }

  getStudent():Observable<Student[]>{
    const studentDetails = collection(this.firestore,'Students');
    return collectionData(studentDetails,{idField:'Serial_Id'}) as Observable<Student[]>;
  }

  updateStudentByUcid(ucid: string, updatedData: Partial<Student>): Promise<void> {
    console.log(ucid);
    console.log(updatedData);
    
    return new Promise<void>(async (resolve, reject) => {
      try {
        const studentsCollection = collection(this.firestore, 'Students');

        // Query the collection to find the document with the matching UCID
        const q = query(studentsCollection, where('UCID', '==', ucid));
        const querySnapshot: QuerySnapshot = await getDocs(q);

        // Check if a matching document is found
        if (querySnapshot.size > 0) {
          // Delete the first matching document found (assuming UCID is unique)
          const documentRef = doc(this.firestore, 'Students', querySnapshot.docs[0].id);
          await updateDoc(documentRef,updatedData);
          resolve();
        } else {
          reject(new Error('No student with the specified UCID found.'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  deleteStudentByUcid(ucid: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const studentsCollection = collection(this.firestore, 'Students');
        console.log(ucid)
        if(ucid === undefined)
         {ucid=' ';}
        // Query the collection to find the document with the matching UCID
        const q = query(studentsCollection, where('UCID', '==', ucid));
        const querySnapshot: QuerySnapshot = await getDocs(q);

        // Check if a matching document is found
        if (querySnapshot.size > 0) {
          // Delete the first matching document found (assuming UCID is unique)
          const documentRef = doc(this.firestore, 'Students', querySnapshot.docs[0].id);
          await deleteDoc(documentRef);
          resolve();
        } else {
          reject(new Error('No student with the specified UCID found.'));
        }
      } catch (error) {
        reject(error);
      }
    });
  }


  addStudent(student:Student){
    const studentDetails = collection(this.firestore,'Students');
    return addDoc(studentDetails,student);
  }

}
