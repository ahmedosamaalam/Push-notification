import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { ListComponent } from './list/list.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [ListComponent, PostComponent],
  imports: [CommonModule, BlogRoutingModule],
  exports: [BlogRoutingModule],
})
export class BlogModule {}
