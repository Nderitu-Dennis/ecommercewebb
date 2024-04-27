
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

cartItems: any[] = []; //variable to store cart items
order: any;  //variable to store order details

couponForm!: FormGroup;

constructor(private customerService:CustomerService,
  private snackbar : MatSnackBar,
  private fb : FormBuilder,
  public dialog: MatDialog,){}

ngOnInit(): void {  
  this.getCart();
}

applyCoupon(){
  this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res =>{
      this.snackbar.open("Coupon applied successfully!", 'Close',{
        duration: 5000
      });

      this.getCart(); //call this method to refresh the page data
  }, error =>{
    this.snackbar.open(error.error, 'close',{
      duration:5000
    });
  })
}


  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(
      res => {
        this.order = res;
        res.cartItems.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      },
      error => {
        console.error('Error fetching cart:', error);
        // Add any additional error handling logic here
      }
    );
  }

  

  increaseQuantity(productId: any){
    this.customerService.increaseProductQuantity(productId).subscribe(res =>{
      this.snackbar.open('Product quantity increased!','Close',{duration:5000});
      this.getCart(); //updating cart details
    })
  }

  decreaseQuantity(productId: any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res =>{
      this.snackbar.open('Product quantity decreased!','Close',{duration:5000});
      this.getCart(); //updating cart details
    })
  }

  placeOrder(){
    this.dialog.open(PlaceOrderComponent);
  }

}

