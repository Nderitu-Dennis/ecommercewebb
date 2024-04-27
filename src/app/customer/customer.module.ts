import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoAngularMaterailModule } from '../DemoAngularMaterialModule';
import { OrdersComponent } from '../admin/components/orders/orders.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { ViewOrderedProductsComponent } from './components/view-ordered-products/view-ordered-products.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { ReviewOrderedProductComponent } from './components/review-ordered-product/review-ordered-product.component';


@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
   PlaceOrderComponent,
    OrdersComponent,
    CartComponent,
    MyOrdersComponent,
    ViewOrderedProductsComponent,
    PlaceOrderComponent,
    ReviewOrderedProductComponent,
    
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoAngularMaterailModule
  ]
})
export class CustomerModule { }
