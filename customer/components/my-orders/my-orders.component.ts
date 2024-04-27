/* import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  myOrders : any; //variable

  constructor(private customerService: CustomerService){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrdersByUserId().subscribe(res =>{
      this.myOrders=res;
    })
  }

} */

import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  myOrders : any; //variable
  error: string | null = null;

  constructor(private customerService: CustomerService){}

  ngOnInit(){
    this.getMyOrders();
  }

  getMyOrders(){
    this.customerService.getOrdersByUserId().subscribe(
      (res) => {
        this.myOrders = res;
        this.error = null; // Clear any previous errors
      },
      (error) => {
        this.error = 'Error fetching orders: ' + error.message; // Handle error
      }
    );
  }

}
