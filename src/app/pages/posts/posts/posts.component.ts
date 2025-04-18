import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {PostsService} from '../../../core/api/posts.service';
import {Post} from '../../../models/post.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, of, switchMap, takeUntil} from 'rxjs';
import {PostCardComponent} from '../../../shared/post-card/post-card.component';

@Component({
  selector: 'posts',
  imports: [
    PostCardComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  searchControl = new FormControl('');

  private postsService: PostsService;

  public pageSize: number = 9;
  public currentPage = signal(1);
  public posts: Post[] = [];
  public searchResults: Post[] = [];
  public isLoading: boolean = false;

  constructor() {
    this.postsService = inject(PostsService);

    effect(() => {
      this.loadPosts();
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  getNextPage(): void {
    this.currentPage.update(v => v + 1);
  }

  getPreviousPage(): void {
    this.currentPage.update(v => v - 1);
  }

  loadPosts() {
    let currentPage = this.currentPage();

    this.postsService.getPaginated(this.pageSize, this.pageSize * (currentPage - 1))
      .subscribe( posts => {
        this.posts = posts;
    });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(term => term != null && (term.length >= 2 || term.length === 0)),

      // Handle subscription cleanup
      //takeUntil(this.destroy$),

      // Switch to new search observable, canceling previous in-flight requests
      switchMap(term => {
        if (term == null || term.length === 0) {
          return [];
        }

        return this.posts.filter(post => post.title.toLowerCase().indexOf(term.toLowerCase()) !== -1);
      })
    ).subscribe(results => {
      //this.searchResults = results;
      this.isLoading = false;
    });
  }
}
