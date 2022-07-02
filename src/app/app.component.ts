import { PrintService } from 'src/app/services/print.service';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isUserValid = false;
  isAdminValid = false;

  isPrint = false;

  constructor(
    public auth: AuthService,
    public loader: LoaderService,
    public print: PrintService
  ){

    this.auth.isUser.subscribe(userValid => this.isUserValid = userValid);
    this.auth.isAdmin.subscribe(adminValid => this.isAdminValid = adminValid);
    
    var isPrinting = sessionStorage.getItem('printing');
    this.print.isPrinting.subscribe(p => this.isPrint = p);
    if(isPrinting !== null){
      this.isPrint = JSON.parse(isPrinting);
    }
  }

  ngOnDestroy(): void {
    this.auth.isUserLoggedIn();
    this.auth.isAdminLoggedIn();
  }
  
  

}
