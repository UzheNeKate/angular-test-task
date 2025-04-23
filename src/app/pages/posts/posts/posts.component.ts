import {Component, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {PostsService} from '../../../core/api/posts.service';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {PostCardComponent} from '../../../shared/post-card/post-card.component';
import {Post} from '../../../core/models/post.model';

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
export class PostsComponent implements OnInit, OnDestroy {
  searchControl = new FormControl('');

  private destroy$ = new Subject<void>();
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
      this.setupSearch();
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
      .subscribe(posts => {
        this.posts = posts;
        this.searchResults = posts;
      });
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(term => term != null && (term.length >= 2 || term.length === 0)),
        switchMap(term => this.searchLocalData(term ?? '')),
        takeUntil(this.destroy$)
      )
      .subscribe(results => {
        this.searchResults = results;
      });
  }

  private searchLocalData(term: string): Observable<any[]> {
    if (!term.trim()) {
      return of(this.posts || []);
    }

    term = term.toLowerCase();

    const results = this.posts.filter(item =>
      item.title.toLowerCase().includes(term) ||
      (item.body && item.body.toLowerCase().includes(term))
    );

    return of(results);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
