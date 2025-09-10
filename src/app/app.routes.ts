import { Routes } from '@angular/router';
import { RouteName } from '@app-enums';

export const routes: Routes = [
  {
    path: RouteName.Empty,
    redirectTo: RouteName.Posts,
    pathMatch: 'full',
  },
  {
    path: RouteName.Posts,
    loadChildren: () => import('./features/post-list/post-list.routes').then((m) => m.postsRoutes),
  },
];
