import { Routes } from '@angular/router';
import { RouteName } from '@app-enums';

export const postsRoutes: Routes = [
  {
    path: RouteName.Empty,
    loadComponent: () => import('./post-list.component').then((m) => m.PostListComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('../details/details.component').then((m) => m.DetailsComponent),
  },
];
