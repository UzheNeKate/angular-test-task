import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home/home.component";

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () =>
        import('./pages/posts/posts.routes').then(m => m.postsRoutes) },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
