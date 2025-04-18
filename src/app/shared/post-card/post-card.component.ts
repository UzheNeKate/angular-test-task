import {Component, input} from '@angular/core';
import {Router} from '@angular/router';
import {Post} from '../../models/post.model';

@Component({
  selector: 'post-card',
  imports: [],
  standalone: true,
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
