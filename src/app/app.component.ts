import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
  message: string;
  ngOnInit(): void {
    this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
	  message= data;
      console.log(data);
    });
  }
}