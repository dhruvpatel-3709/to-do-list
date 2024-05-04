import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { FirebaseService } from '../firebase.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { toDos } from './to-do-list';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit {
  todolist: toDos[] = [];
  backupToDoList: toDos[] = [];
  displayedColumns: string[] = [];
  dataSource?: MatTableDataSource<any>;
  searchValue:string="";
  constructor(private dialog: MatDialog,
    private fireStore: FirebaseService
  ) {
    this.displayedColumns = ['id', 'title', 'description', 'dueDate', 'attachment', 'action'];

  }

  ngOnInit() {
    // this.fireStore.addStudent("title",
    // "desc",
    // "04-04-2024",
    // "file")
    this.getDocs();

  }

  openModal() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.event == 'submit') {
        Object.keys(result.data).forEach(el => {
          if (el === 'dueDate') {
            result.data[el] = result.data[el].toString()
          }
        })
        this.addToDo(result.data);
        this.getDocs();
        // this.addRowData(result.data);
      } 
    });
  }
  async getDocs() {
    const todos = await this.fireStore.getToDos();
    this.updateStudentCollection(todos);
  }
  addToDo(data: toDos) {
    this.fireStore.addStudent(data)
  }
  updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
    // this.studentCollectiondata = [];
    this.todolist = [];
    this.backupToDoList = [];
    snapshot.docs.forEach((student) => {
      this.todolist.push({ ...student.data(), id: student.id });
      this.backupToDoList.push({ ...student.data(), id: student.id });
    });
    this.dataSource = new MatTableDataSource(this.todolist);
    console.log(this.todolist);
  }
  deleteToDo(id: string) {
    this.fireStore.deleteTodo(id);
    this.getDocs();

  }
  updateModal(data: toDos) {
    debugger
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        dataKey: data
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      debugger
      if (result.event == 'update') {
        Object.keys(result.data).forEach(el => {
          if (el === 'dueDate') {
            result.data[el] = result.data[el].toString()
          }
        })
        this.updateToDo(result.data.id,result.data);
      }
    });
  }
  updateToDo(id:string,data:toDos) {
    this.fireStore.updateToDo(id,data);
    this.getDocs();
  }
  filterData(){
    if(this.searchValue !==""){
      this.todolist = this.backupToDoList.filter(el=>el.title?.toLowerCase().includes(this.searchValue.toLowerCase()));
      this.dataSource = new MatTableDataSource(this.todolist);
    }else{
      this.todolist = this.backupToDoList;
      this.dataSource = new MatTableDataSource(this.todolist);
    }
   
  }

}
