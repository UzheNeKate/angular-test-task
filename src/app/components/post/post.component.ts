import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../../models/post.model';
import {PostsService} from '../../services/posts.service';
import {Comment} from '../../models/comment.model';
import {CommentsService} from '../../services/comments.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [
    AsyncPipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  post: Post = new Post();
  comments: Comment[] = [];

  constructor(private route: ActivatedRoute, private postsService: PostsService,
              private commentsService: CommentsService) {}

  ngOnInit() {
    let idString = this.route.snapshot.paramMap.get('id') ?? '';
    let id = Number.parseInt(idString);

    this.postsService.getById(id).subscribe(post => { this.post = post; });
    this.commentsService.getAllForPost(id).subscribe(comments => { this.comments = comments });
  }


}
