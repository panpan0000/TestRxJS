import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

let URL='https://randomuser.me/api/';


/*
@Injectable()                        //  the data service is an injectable class
export class MyService {
		dataStream: Subject<any>;
		getData() : any {		return this.dataStream;}
		
		constructor(private http: HttpClient){
		  let ts = new Subject<any>();
		  Observable.timer(0, 4000).subscribe( t => {ts.next(t);}  );
		  this.dataStream = ts.pipe( switchMap(()=>{  return this.http.get(URL);} )  );	
		}
}
*/


// ====== Workable==============

@Injectable()
export class MyService
{
    sub = new BehaviorSubject<any>(0);
    dataStream: Observable<any>;
    timer_subscription : any;
    cnt : number = 0;
    timer = Observable.timer(0,1000);
    startPolling(){
        this.timer_subscription = this.timer.subscribe(
            (t) => {  
					this.http.get(URL).subscribe(data =>  { this.sub.next(data);console.log("Try to get HTTP request : t=",t, "this.cnt=",this.cnt, "data=", data.results[0].name.first); });
			}
    }
    constructor(private http: HttpClient){
		
        this.dataStream = Observable.create(
            observer => {
                if(this.cnt ==0 ) {   this.startPolling(); }
                this.cnt +=1;
                let subscription = this.sub.subscribe(d => { observer.next(d); } );
                observer.add( ()=>{     //Adds a tear down to be called during the unsubscribe() of this Subscription.
                    subscription.unsubscribe();
                    this.cnt -=1;
                    if (this.cnt ==0) {this.timer_subscription.unsubscribe();}
                }); // end of observer.add(
            }
        ); // end of Observable.create(
    }
}


/*=-================latest===============but can't stop
@Injectable()                        //  the data service is an injectable class
export class MyService 
{


   sub = new BehaviorSubject<any>();
   dataStream: Observable<any>;
   timer_subscription : any;
   timer = Observable.timer(0,1000); // starting in 0 ms, and later repeat every 2000 ms;

   cnt : number = 0;
   startPolling(){
	      console.log("start polling")
		  this.timer_subscription = this.timer.subscribe( 
			(t) => {
					this.http.get(URL).subscribe(data =>  { this.sub.next(data);console.log("Try to get HTTP request : t=",t, "this.cnt=",this.cnt, "data=", data.results[0].name.first); } ) ;
				   }
		  );	  
	}   
   constructor(private http: HttpClient){

	  // I don't understand. why when nobody subscribe this.sub, there will be no http call ?

	  
 	  this.dataStream = Observable.create(
	        observer =>	{
				if(this.cnt == 0 ) {  this.startPolling()};
				this.cnt +=1;
				let subscription = this.sub.subscribe(d => { observer.next(d); } );
				observer.add( ()=>{     //Adds a tear down to be called during the unsubscribe() of this Subscription.
					subscription.unsubscribe();
					this.cnt -=1;
					if (this.cnt ==0) {this.timer_subscription.unsubscribe();}
				});
			}
	  );
   }
  
}
*/






/*
@Injectable()                        //  the data service is an injectable class
export class MyService 
{


   dataStream: Observable <any>;

   timer: Observable<any> = Observable.timer(0,4000); // starting in 0 ms, and later repeat every 2000 ms;
   constructor(private http: HttpClient){
  	  this.dataStream = Observable.create(
	        observer =>
			{
				// of course ,  setInterval also works. but you need to invoke the http-get function twice(before setInterval() and inside setInterval()) to ensure we obtain data immediately.
				let subscription = this.timer.subscribe(t => {
												this.emit_from_http( observer);
												console.log(`No.${t} to fetch data from backend API.`);	
										} );
				observer.add( ()=>{  subscription.unsubscribe(); });//Adds a tear down to be called during the unsubscribe() of this Subscription.
										

				

			}
	  );

   }
   private emit_from_http( ob: Observer<any> ):void {
				this.http.get(URL).subscribe(
					  data => {
					  ob.next(data);	
				});
				
   }
}
*/
/*===================================


// usage
//let subscription = myService.dataStream.subscribe(data => {}, err => {})
//subscription.unsubscribe();

@Injectable()                        //  the data service is an injectable class
export class MyService {
  sub = new BehaviorSubject<any>();
  polling: any;
  poller = Observable.timer(0,5000);            // define a BehaviorSubject
  constructor(private http: HttpClient){
  }

  startPolling(){
	console.log("start Polling");
    this.polling = this.poller.subscribe(
      (t) => 
			{
				this.http.get(URL).subscribe(data =>  { this.sub.next(data);console.log("Try to get HTTP request : t=",t, "data=", data.results[0].name.first); } ) ;
			}
    )
  }

  stopPolling(){
	console.log("stop Polling");
  }

  _subscription: any;
  dataStream = {
    subscribe: (scb: any, ecb: any) => {
      this.startPolling();
      this._subscription = this.sub.subscribe(
        data => scb(data),
        error => ecb(error)
      );
      return this.dataStream;
    },
    unsubscribe: () => {
      this.stopPolling();
      this._subscription.unsubscribe();
      this.polling.unsubscribe();

    }
  };
}
*/




/*
@Injectable()                        //  the data service is an injectable class
export class MyService 
{

   sub: BehaviorSubject<any>;
   obs: Observable <any>;

   constructor(private http: HttpClient){
 

		let t = Observable.timer(0,20000); // starting in 0 ms, and later repeat every 2000 ms
	
		this.obs = t.pipe( switchMap( (t) => { return this.http.get(URL);} ) );
		
   }
   
   public  getData(): Observable<any>  { return this.obs; };
}
*/


/*//============================ latest 
@Injectable()                        //  the data service is an injectable class
export class MyService 
{
   sub: BehaviorSubject <any>;             // define a BehaviorSubject
   
   constructor(private http: HttpClient){
	   
		this.sub = new BehaviorSubject<any>();
					
		setInterval(  ()=>{
							console.log("HTTP get data");
							this.http.get(URL).subscribe(  data => { this.sub.next(data);} )  ;
						  }, 1000);		
		
   }
   public  getData(): Observable<any>  { return this.sub; };

   }
*/

/*




@Injectable()                        //  the data service is an injectable class
export class MyService 
{
   sub: BehaviorSubject <any>;             // define a BehaviorSubject
   
   constructor(private http: HttpClient){
	   
		this.sub = new BehaviorSubject<any>()
					setInterval(  ()=>{ 
							this.sub.next({key:123,item:dsfd});
					}, 4000);

			let timer = Observable.timer(0,2000); // starting in 0 ms, and later repeat every 2000 ms
					
					
		var x= timer.map( () => {
										//let d = this.http.get(URL).subscribe(  data => d=data );
										return this.http.get(URL);
									} );
							
		
		setInterval(  ()=>{ this.httpGetBackendData( this.sub);}, 4000);

		/*
		let timer = Observable.timer(0,2000); // starting in 0 ms, and later repeat every 2000 ms
		
		// of course ,  setInterval also works. but you need to invoke the http-get function twice(before setInterval() and inside setInterval()) to ensure we obtain data immediately.
		let subscription = timer.subscribe(t => {
					this.httpGetBackendData( this.sub) ;
					console.log(`No.${t} to fetch data from backend API.`);	
		} );
		
		//	this.sub.add( ()=>{  subscription.unsubscribe(); });//Adds a tear down to be called during the unsubscribe() of this Subscription.


   }
   private  httpGetBackendData( bs: BehaviorSubject<any> ): void  {
	        this.http.get(URL).subscribe(  data => { bs.next(data);} )  ;
  };
   public  getObs(): Observable<any>  { return this.sub; };
}

		*/	  