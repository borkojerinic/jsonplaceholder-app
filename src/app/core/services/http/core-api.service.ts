import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@app-environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  protected readonly path = environment.jsonApiUrl;
  protected readonly http = inject(HttpClient);

  /**
   * Generic Get method, will return single element of type T.
   *
   * @param slug string
   *
   * @returns Observable<T>
   */
  protected get<T>(slug: string): Observable<T> {
    return this.http.get<T>(this.path + slug);
  }
}
