import {AfterViewInit, Component, ViewChild} from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MoviesModel} from '../utility/movies.model';
import {AppService} from '../app.service';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements AfterViewInit {

  allMovies = new MatTableDataSource<MoviesModel>([]);
  displayedColumns: string[] = ['title', 'url', 'platform', 'score', 'genre', 'release_year'];
  isLoadingResults = true;
  resultsLength = 0;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private appService: AppService) {
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.appService.getAllMovies();
        }),
        map(response => {
          this.isLoadingResults = false;
          this.resultsLength = response.length;
          return response;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return of([]);
        })
      ).subscribe(response => {
      this.allMovies.data = response;
      this.allMovies.paginator = this.paginator;
      this.allMovies.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allMovies.filter = filterValue.trim().toLowerCase();

    if (this.allMovies.paginator) {
      this.allMovies.paginator.firstPage();
    }
  }
}
