import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private httpClient = inject(HttpClient);

  constructor() { }

  getAll(): Observable<Post[]>{
    return this.httpClient.get<Post[]>(this.baseUrl)
  }

  getById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`)
  }
}
