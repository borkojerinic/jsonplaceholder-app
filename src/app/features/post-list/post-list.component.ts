import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { Post } from '@app-models';
import { PostHttpService } from '@app-shared-services';

@Component({
  selector: 'app-post-list.component',
  imports: [MatCardModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  //#region Properties

  public posts = signal<Post[] | null>(null);

  //#endregion

  //#region Dependencies

  private postHttpService = inject(PostHttpService);
  private destroyRef = inject(DestroyRef);

  //#endregion

  //#region Angular life cycle hooks

  ngOnInit(): void {
    this.initPostsList();
  }

  //#endregion

  //#region Init methods

  /**
   * Fetches posts from the API and updates the posts signal.
   *
   * @returns void
   */
  private initPostsList(): void {
    this.postHttpService
      .getPosts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((posts) => this.posts.set(posts));
  }

  //#endregion
}
