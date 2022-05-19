import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  myForm: FormGroup;
  constructor() {
     this.myForm = new FormGroup({
    name: new FormControl('Sammy'),
   
  });}

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    if(this.myForm.valid){
      
    }
   
  }
}
