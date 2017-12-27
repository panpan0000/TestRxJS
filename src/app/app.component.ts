import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   show1 = true;
   show2 = true;
   toggle1() : void {
	   this.show1 = !this.show1;
   }
  toggle2() : void {
	   this.show2 = !this.show2;
   }   
}



