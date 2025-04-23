import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostsService} from '../../../core/api/posts.service';
import {CommentsService} from '../../../core/api/comments.service';
import {Post} from '../../../core/models/post.model';
import {Comment} from '../../../core/models/comment.model';

@Component({
  selector: 'app-post',
  imports: [],
  standalone: true,
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
