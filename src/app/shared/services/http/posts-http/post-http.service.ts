import { Injectable } from '@angular/core';
import { CoreApiService } from '@app-core-services';
import { Post } from '@app-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostHttpService extends CoreApiService {
  /**
   * Get all posts with optional limit (default 10)
   *
   * @param limit number
   *
   * @returns Observable<Post[]>
   */
  public getPosts(limit: number = 10): Observable<Post[]> {
    return this.get<Post[]>(`/posts?_limit=${limit}`);
  }

  /**
   * Get a single post by ID.
   *
   * @param id number
   *
   * @returns Observable<Post>
   */
  public getPost(id: number): Observable<Post> {
    return this.get<Post>(`/posts/${id}`);
  }
}
