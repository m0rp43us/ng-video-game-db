import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
import { env } from 'process';
import { forkJoin, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getGameDetails(id: string):Observable<Game> {
    const gameInfoRequest = this.http.get(`https://rawg-video-games-database.p.rapidapi.com/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `https://rawg-video-games-database.p.rapidapi.com/games/${id}/screenshots`
    );
    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest
    }).pipe(
      map((resp:any)=>{
        return{
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        }
      })
    );
  }

  constructor(private  http:HttpClient) { }

getGameList(ordering:string,search?:string):Observable<APIResponse<Game>>{
    let params = new HttpParams().set('ordering',ordering);
    if(search){
      params = new HttpParams().set('ordering',ordering).set('search',search);
    }
    return this.http.get<APIResponse<Game>>(`https://rawg-video-games-database.p.rapidapi.com/games`,{params:params
    });
  }
}
