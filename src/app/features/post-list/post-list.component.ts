import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Post } from '@app-models';
import { PostHttpService } from '@app-shared-services';

@Component({
  selector: 'app-post-list.component',
  imports: [MatCardModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  //#region Dependencies

  private postHttpService = inject(PostHttpService);

  //#endregion

  //#region Properties

  public posts: Signal<Post[] | null> = toSignal<Post[] | null>(this.postHttpService.getPosts(), {
    initialValue: null,
  });

  //#endregion
}
