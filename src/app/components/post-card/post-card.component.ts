import {Component, input, Input} from '@angular/core';
import {Post} from '../../models/post.model';
import {Router} from '@angular/router';

@Component({
  selector: 'post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  post = input<Post>();

  constructor(private router: Router) {
  }

  openPost() {
    this.router.navigate(['/posts', this.post()?.id]);
  }
}
