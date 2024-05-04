import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  selectedFile: any;
  todoForm!:FormGroup;
  
  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
   }

  ngOnInit() { 
    console.log(this.data)
    this.initToDoForm();
    if(this.data && this.data.dataKey){
      this.patchValueToDo();
    }
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
  patchValueToDo() {
    this.todoForm.patchValue({
      title:this.data.dataKey.title,
      description:this.data.dataKey.description,
      dueDate:new Date(this.data.dataKey.dueDate),
      attachment:this.data.dataKey.attachment
    });
  }
  initToDoForm(){
    this.todoForm = this.fb.group({
      title:[''],
      description:[''],
      dueDate:[''],
      attachment:['']
    })
  }
  submit(){
    this.dialogRef.close({event:'submit',data:this.todoForm.value});
  }
  update(){
    debugger
    this.dialogRef.close({event:'update',data:{...this.todoForm.value,id:this.data.dataKey.id}});
  }
}
