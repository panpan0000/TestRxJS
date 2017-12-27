import { Component, OnInit , OnDestroy  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyService } from '../service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit ,OnDestroy{

  constructor( private http: HttpClient, private myService: MyService ){};
  message1: string;
  message2: string;

  private subscription1: any;
  private subscription2: any;

  ngOnInit(): void {
      this.subscription1 = this.myService.dataStream.subscribe(
	  data => {
	  this.message1= data?  data.results[0].name.last : "loading";
    });
	
      this.subscription2 = this.myService.dataStream.subscribe(
	  data => {
	  this.message2= data?  data.results[0].name.first : "loading";
    });	
	
  }
  
  ngOnDestroy(): void{
     this.subscription1.unsubscribe();
     this.subscription2.unsubscribe();

  }	
}
