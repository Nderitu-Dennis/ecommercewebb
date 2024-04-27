import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]], // Ensure description field is defined in the form
    });
  }

  /*addCategory(): void {
    if (this.categoryForm.valid) {
      // Ensure that the description value is a string
      const formData = this.categoryForm.value;
      formData.description = String(formData.description); // Convert to string if needed

      this.adminService.addCategory(formData).subscribe((res) => {
        if (res.id != null) {
          this.snackBar.open('Category Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }
}*/

addCategory(): void {
  // Log the data before sending the request
  console.log('Category Form Data:', this.categoryForm.value);

  // Only if the category form is valid can other operations be performed
  if(this.categoryForm.valid){
    this.adminService.addCategory(this.categoryForm.value).subscribe((res) =>{
      if(res.id != null) {
        this.snackBar.open('Category Posted Successfully!', 'Close',{
          duration: 5000
        });
        this.router.navigateByUrl('/admin/dashboard');
      }
      else{
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    });
  } else {
    this.categoryForm.markAllAsTouched();
  }
}
}

