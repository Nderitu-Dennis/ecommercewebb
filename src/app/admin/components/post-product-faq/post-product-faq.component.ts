import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss']
})
export class PostProductFaqComponent {

  productId: number=this.activatedRoute.snapshot.params["productId"];
  FAQForm!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private adminservice :AdminService,
    private snackbar:MatSnackBar,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(){
    this.FAQForm=this.fb.group({
      question: [null, [Validators.required]],
      answer: [null,[Validators.required]],
    })

  }

  postFAQ(){
    this.adminservice.postFAQ(this.productId, this.FAQForm.value).subscribe(res =>{
      if(res.id != null){
        this.snackbar.open('FAQ posted successfully!','Close',{
          duration:5000
        });
        this.router.navigateByUrl('/admin/dashboard');
      } else{
        this.snackbar.open("Something went wrong",'Close',{
          duration: 5000,
          panelClass: 'error-snackbar'
          
        });
      }
    })
  }}

    
   

  

      
