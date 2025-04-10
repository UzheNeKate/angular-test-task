import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  private httpClient = inject(HttpClient);

  constructor() { }

  getAllForPost(postId: number): Observable<Comment[]>{
    return this.httpClient.get<Comment[]>(`${this.baseUrl}/${postId}/comments`);
  }

  getById(postId: number, commentId: number): Observable<Comment> {
    return this.httpClient.get<Comment>(`${this.baseUrl}/${postId}/comments/${commentId}`);
  }
}
