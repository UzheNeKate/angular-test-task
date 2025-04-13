import {Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../../models/post.model';
import {PostsService} from '../../services/posts.service';
import {AsyncPipe} from '@angular/common';
import {PostCardComponent} from '../post-card/post-card.component';

@Component({
  selector: 'posts',
  imports: [
    AsyncPipe,
    PostCardComponent
  ],
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  private postsService: PostsService;

  public posts$: Observable<Post[]> | undefined;

  constructor() {
    this.postsService = inject(PostsService);
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAll();
  }
}
