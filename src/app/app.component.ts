import { Component } from '@angular/core';
import { UserstorageService } from './services/auth/storage/userstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerceweb';

  isCustomerLoggedIn : boolean = UserstorageService.isCustomerLoggedIn();
  isAdminLoggedIn : boolean = UserstorageService.isAdminLoggedIn();

  constructor(private router : Router){ }

  ngOnInit(): void {
    this.router.events.subscribe(event =>{
      this.isCustomerLoggedIn = UserstorageService.isCustomerLoggedIn();
      this.isAdminLoggedIn = UserstorageService.isAdminLoggedIn();

      
    })
  }

  logout(){
    UserstorageService.signOut();
    this.router.navigateByUrl('login');
  }

}

