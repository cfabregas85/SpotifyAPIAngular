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

  constructor(private _spotify:SpotifyService) { }

  Search(keyword: string)  {

    this.loading =true;
    this._spotify.getArtist(keyword)
    .subscribe( (data : any) => {
       this.artists = data;
       this.loading =false;
    });    
  }  
}
