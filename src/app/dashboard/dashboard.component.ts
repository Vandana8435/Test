import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';
import { PaginationService } from '../services/pagination.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  myForm: FormGroup;
  isEdit:boolean=false;
  name:any;
  isPending:any;
  dashboardData:any;
  isComplete:any;
  pagination:any;
  currentPage:number=0;
  allData:any=true
rows:any=[{
  name:'Dashboard CRUD',
  status:'Pending'
},
{
  name :'Login Module',
  status:'Pending'
},
{
  name:'Signup Module',
  status:'Complete'
}]

Pending:any=[{
  name:'Dashboard CRUD',
  status:'Pending'
},
{
  name :'Login Module',
  status:'Pending'
},
]
Complete:any=[
{
  name:'SignIn Module',
  status:'Complete'
}]

  constructor(private router:Router,private paginationService: PaginationService,private dashboardService:DashboardService) {
    this.myForm = new FormGroup({
      name: new FormControl('Sammy'),
     
    });
   }
   ngOnInit(): void {
     this.getData();
  }

getData(){
  this.dashboardService.getData().subscribe((res:any)=>{
    if(res){
      this.dashboardData=res?.data;
      
      this.pagination = this.paginationService.getPager(res.data.pagination['total_page'], this.currentPage);
      console.log("dasd",res.data.pagination);
      
    }
  })
}
   addTask():void {
    this.router.navigateByUrl('add')
  }
  


  onSubmit(form: FormGroup) {
    if(this.myForm.valid){
     
      if(this.isEdit){
        if(this.allData){
          let index = this.rows.findIndex((ele:any)=>ele.name ==this.name)
        
          if(index!=-1){
            this.rows.splice(index,1);
          }
          this.rows.unshift({'name':this.myForm.controls['name'].value})
        
        }else if(this.isPending){
          let index = this.Pending.findIndex((ele:any)=>ele.name ==this.name)
        
          if(index!=-1){
            this.Pending.splice(index,1);
          }
          this.Pending.unshift({'name':this.myForm.controls['name'].value})
        }else{
          let index = this.Complete.findIndex((ele:any)=>ele.name ==this.name)
        
          if(index!=-1){
            this.Complete.splice(index,1);
          }
          this.Complete.unshift({'name':this.myForm.controls['name'].value})
        }
       
     
      }
    
      
    }
  }
  pendingData():void{
   
    
    this.isPending=true;
    this.allData=false;
    this.isComplete=false
   // this.rows=this.rows.filter((x:any)=>x.status=='Pending')
  }
  getPage(page: number) {
    this.currentPage = page;
    this.getData();
  }
  completeData():void{
    this.isPending=false;
    this.allData=false;
    this.isComplete=true
    //this.rows=this.rows.filter((x:any)=>x.status=='Complete')
  }
  all(){
    this.allData=true;
    this.isPending=false;
    this.isComplete=false
  }
  editData(editData:any){
  
    this.myForm.controls['name'].patchValue(editData.name);
    this.name=editData.name;
    this.isEdit=true;
  }
  deleteData(deleteData:any){
     let index = this.rows.findIndex((ele:any)=>ele.name ==deleteData.name)
       
        if(index!=-1){
          this.rows.splice(index,1);
        }
  }
  changeStatus(data:any):void{
   
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Pending',
      cancelButtonText: 'Complete',
    }).then((result) => {
      
      

      if (result.isConfirmed) {
          let index = this.rows.findIndex((ele:any)=>ele.name ==data.name)
          this.Pending.push(data);
          if(index!=-1){
            this.rows.splice(index,1);
          }
          


      } else if (result.isDismissed) {

        let index = this.rows.findIndex((ele:any)=>ele.name ==data.name)
        this.Complete.push(data);
        if(index!=-1){
          this.rows.splice(index,1);
        }

      }
    })

  }
 
}
   
  
