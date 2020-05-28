import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: '/blogs',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'blogs',
        loadChildren: () =>
          import('./blog/blog-routing.module').then((m) => m.BlogRoutingModule),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'sessions/404',
  },
];
