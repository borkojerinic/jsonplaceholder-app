import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post } from '@app-models';
import { CommentsHttpService, PostHttpService } from '@app-shared-services';
import { forkJoin, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-details.component',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  //#region Dependencies

  private activatedRoute = inject(ActivatedRoute);
  private postHttpService = inject(PostHttpService);
  private commentsHttpService = inject(CommentsHttpService);

  //#endregion

  //#region Properties

  private postData: Signal<{ post: Post; comments: Comment[] } | null> = toSignal<{
    post: Post;
    comments: Comment[];
  } | null>(
    this.activatedRoute.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        forkJoin({
          post: this.postHttpService.getPost(id),
          comments: this.commentsHttpService.getComments(id),
        }),
      ),
    ),
    { initialValue: null },
  );

  public post = computed(() => this.postData()?.post ?? null);
  public comments = computed(() => this.postData()?.comments ?? []);

  //#endregion
}
