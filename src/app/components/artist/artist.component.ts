import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {

  artist : any={};
  topTracks:any []=[];
  loading : boolean;

  constructor(private _router:ActivatedRoute,
              private _spotify: SpotifyService) {

     this.loading = true;
     this._router.params.subscribe(params=>{
     this.GetArtistDetails(params['id']); 
     this.GetTopTracks(params['id']);    
    });  
  }

  GetArtistDetails( id : string ){   
    this.loading = true;
    
    this._spotify.getArtistDetails(id)
    .subscribe( a=>{
       console.log(a);
       this.artist =a;               
       this.loading = false;
    });    
  }  

  GetTopTracks(id:string){

    this._spotify.getArtistTopTracks(id)
    .subscribe(top=>{
      console.log(top);
     this.topTracks =top;     
    });


  }

}
