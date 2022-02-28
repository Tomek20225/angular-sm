import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router"

import { UsersService } from './users.service'; 
import { Post } from '../models/post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  url:string = '/api/posts/'; // Normal
  // url:string = 'http://recodeit-testy.cba.pl/api/posts/'; // Electron
  anchors:any[] = [];

  constructor(private http:HttpClient, private router: Router, private userService: UsersService) { }

  // Add Post
  addPost(post: Post):Observable<Post> {
    return this.http.post<Post>(this.url, post, httpOptions);
  }

  // Get all Posts
  getPosts():Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  // Get specific Post
  getPost(way: string, needle: string):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}?${way}=${needle}&limit=1`);
  }

  // Replace plain text with anchor tags
  createTextLinks(text) {
    return (text || "").replace(
      /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, (match, space, url) => {
        let hyperlink = url;

        if (!hyperlink.match('^https?:\/\/'))
          hyperlink = 'http://' + hyperlink;

        this.anchors.push(hyperlink);

        return space + '<a target="_blank" href="' + hyperlink + '">' + url + '</a>';
      }
    );
  }

  // Get entire webpage as HTML
  getPage(imgUrl: string): Observable<any> {
    return this.http.get(imgUrl, {responseType: 'text'}).pipe(catchError(err => of(null)));
  }

  // Retrieve og:image url from HTML (string)
  getOgImageUrl(html: string): string {
    if (!html)
      return null;
      
    let rawHTML = document.createRange().createContextualFragment(html);
    let ogImgUrl = rawHTML.querySelector('meta[property="og:image"]').getAttribute("content");

    if (ogImgUrl)
      return ogImgUrl;
    else
      return null;
  }

  checkIfImg(url: string): boolean {
    let mimes:string[] = ['.jpg', '.jpeg', '.png', '.gif'];

    for (let mime of mimes)
      if (url.endsWith(mime))
        return true;

    return false;
  }

  // Fix post
  fixPost(post: Post): Post {
    // Add anchors[] property to the Post
    post = {...post, anchors: []};

    // Get Post author's full name
    this.userService
      .getUser('id', `${post.author_id}`)
      .subscribe(user => post.author_id = `${user[0].name} ${user[0].surname}`);

    // Add anchors if needed in Post's body
    post.body = this.createTextLinks(post.body);
    post.anchors = this.anchors;
    this.anchors = [];

    // Fix line breaks in Post's body
    post.body = post.body.replace(new RegExp('\n', 'g'), "<br />");

    return post;
  }
}
