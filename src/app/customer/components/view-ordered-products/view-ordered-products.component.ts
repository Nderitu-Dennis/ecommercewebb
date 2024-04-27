import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent {

  //getting order id from the URL
  orderId: any = this.activatedroute.snapshot.params['orderId'];

  //variable to strore response from the  API
  orderedProductDetailsList = [];

  //variable for total amount
  totalAmount:any;

  constructor(
    private activatedroute : ActivatedRoute,   
    private customerService : CustomerService,){}

    ngOnInit(){
      this.getOrderedProductsDetailsByOrderId();
    }

    getOrderedProductsDetailsByOrderId(){
      this.customerService.getOrderedProducts(this.orderId).subscribe(res =>{
        res.productDtoList.forEach(element =>{
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.orderedProductDetailsList.push(element);
        });
        this.totalAmount = res.orderAmount;
      })
    }
  }


