import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardConfig } from '../Config/dashboard.config';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient,private dashboard: DashboardConfig) { }

  PipelineEngagement(reqMan: any) {
    return this.http.get(environment.jobAndCandidates +this.dashboard.pipeline +`${reqMan}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
