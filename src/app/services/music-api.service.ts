import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MusicApiService {
  
  constructor(private http: Http) { }

  private _rootUrl:string = 'https://itunes.apple.com/search?media=music'
  private _url:string = this._rootUrl;
  /*private _clientKey:string = 'client_id=vCrJOCBiaW5wdhpBD0bV6nUaNYCbYNZI';
  private _secret:string = 'ascGMYWf7ToWJHIkXtOdSpPPOv972n5V';
  private _rootUrl:string = 'https://api.soundcloud.com/'
  
  //private _generalTracks:string = 'tracks?'
  //private _playlists:string = 'playlists?'

  private _url:string = '';

  private _prepareQuery (type:string, quantity:number) {
    return this._rootUrl+type+'kind=top&limit='+quantity+'&'+this._clientKey;
  }

  randomSongs (quantity:number) { 
    this._url = this._prepareQuery('tracks?',quantity)
    return this
  }

  playlistSongs (quantity:number) {
    this._url = this._prepareQuery('playlists?', quantity)
    return this
  }*/

  searchSongs (term:string){
    this._url += '&term='+encodeURIComponent(term)
    return this
  }

  limit (lim:number){
    this._url += '&limit='+lim;
    return this
  }

  performFetch () {
    return this.http.get(this._url)
    .toPromise()
    .then(response =>{ 
        return response.json().results
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}