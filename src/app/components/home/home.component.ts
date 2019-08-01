import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
//import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent  {

  newSounds : any []=[]; 
  loading: boolean;  
  error:boolean;
  errormessaje : string;

  constructor( private _spotifyAPI :SpotifyService ){

    this.loading = true;
    this.error = false;
      
    this._spotifyAPI.getNewReleases()
      .subscribe( (data:any) =>{
       this.newSounds = data;
       this.loading = false;
      }, (errorrequest) =>{
        this.loading = false;
        this.error = true;
        if (errorrequest.error.error.message === 'Invalid access token' || errorrequest.error.error.message === 'The access token expired')
        {
          this.errormessaje = 'Before running this application, you must create a Spotify Token and update the "spotify.service.ts" file.';
        }else
        {
          this.errormessaje = 'Error running this page.';
        }
        console.log(errorrequest);        
      });
  }     
}


