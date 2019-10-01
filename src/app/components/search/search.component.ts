import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent{

   artists: any[] = [];
   loading: boolean; 
   noRecords: boolean;

  constructor(private _spotify:SpotifyService) { }

  Search(keyword: string)  {
    
    if (keyword.length == 0) {
      return ;
    }
    else{
    this.loading =true;
    this._spotify.getArtist(keyword)
    .subscribe( (data : any) => {
       this.artists = data;
       this.loading =false;
    });  
   }
  }  
}
