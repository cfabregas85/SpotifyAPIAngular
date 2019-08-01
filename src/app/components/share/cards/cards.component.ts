import { Component, Input } from '@angular/core';

import { Router } from "@angular/router";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: []
})
export class CardsComponent {

  @Input() items:any[]=[];
  
  constructor(private _router:Router) { }  

  DetailsArtist(item: any){    
     let id ;
     //Get Atrist Id
     if (item.type === 'artist') {
     id =item.id;
    }else{
      id = item.artists[0].id;
    }
    
    this._router.navigate(['/artist', id]);
  }

}
