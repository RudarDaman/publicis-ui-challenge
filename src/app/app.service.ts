import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {MoviesModel} from './utility/movies.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {
  }

  getAllMovies(): Observable<MoviesModel[]> {
    return this.httpClient.get<MoviesModel[]>('http://starlord.hackerearth.com/gamesext');
  }
}
