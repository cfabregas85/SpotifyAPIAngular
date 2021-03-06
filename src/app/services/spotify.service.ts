import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//operator Map
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { 
    console.log('Listo');   
  }

  //Making the Query
  getQuey(query : string)
  {
    const url =`https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':'Bearer Your API Key',                           
    });
    return this.http.get(url, {headers}); 
  }

   //Get Home Data
  getNewReleases(){

   return this.getQuey('browse/new-releases?limit=50')
           .pipe( map(data => data['albums'].items));                
  } 

  //Get Search Data
  getArtist(keyword: string)
  {
    return this.getQuey(`search?q=${ keyword }&type=artist&limit=15`) 
    .pipe(map(data => data['artists'].items));                   
  }

  //Get Artist Details 

  getArtistDetails(id: string)
  {
    return this.getQuey(`artists/${ id}`) ;
   /// .pipe(map(data => data['artists'].items));                   
  }

  getArtistTopTracks(id: string)
  {
    return this.getQuey(`artists/${ id}/top-tracks?country=us`)
     .pipe(map(data => data['tracks']));                        
  }

}
