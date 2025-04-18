import {Component, inject, OnInit} from '@angular/core';
import {PostsService} from '../../../core/api/posts.service';
import {Observable} from 'rxjs';
import {Post} from '../../../models/post.model';
import {AsyncPipe} from '@angular/common';
import {PostCardComponent} from '../../../shared/post-card/post-card.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    PostCardComponent
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private numberOfPostsShowed: number = 5;

  private postsService: PostsService;

  public posts$: Observable<Post[]> | undefined;

  constructor() {
    this.postsService = inject(PostsService);
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPaginated(this.numberOfPostsShowed);
  }
}
