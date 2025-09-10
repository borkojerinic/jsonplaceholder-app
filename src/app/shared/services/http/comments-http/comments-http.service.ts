import { Injectable } from '@angular/core';
import { CoreApiService } from '@app-core-services';
import { Comment } from '@app-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsHttpService extends CoreApiService {
  /**
   * Get comments for a specific post.
   *
   * @param postId number
   *
   * @returns Observable<Comment[]>
   */
  public getComments(postId: string): Observable<Comment[]> {
    return this.get<Comment[]>(`/posts/${postId}/comments`);
  }
}
