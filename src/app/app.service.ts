import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {MoviesModule} from "./utility/movies.module";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private httpClient: HttpClient) {
    }

    getAllMovies(): Observable<MoviesModule>{
        return this.httpClient.get<MoviesModule>('http://starlord.hackerearth.com/gamesext');
    }
}
