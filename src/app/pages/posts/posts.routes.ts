import {Routes} from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {PostComponent} from './post/post.component';
import {canActivatePostGuard} from '../../core/guards/can-activate-post.guard';

export const postsRoutes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: PostsComponent},
      {path: ':id', component: PostComponent, canActivate: [canActivatePostGuard] },
    ]
  }
];
