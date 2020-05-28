import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'post',
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}