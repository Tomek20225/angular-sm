import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { NgForm } from '@angular/forms';

import { UsersService } from '../../../services/users.service';
import { PostsService } from '../../../services/posts.service';

import { Post } from '../../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }), 
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], { optional: true }), 
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(private userService: UsersService, private postService: PostsService) {}

  // Component logic
  loggedIn:boolean = this.userService.getLoggedIn();
  posts:Post[] = [];

  // Alert logic
  alertMsg:string;
  showAlert:boolean = false;
  alertType:string = 'success';
  alertMsgType:string = "Sukces!";

  ngOnInit(): void {
    // Download all Posts if user is logged in
    if (this.loggedIn) {
      this.postService.getPosts().subscribe(postArr => {
        this.posts = postArr;

        // Fix formatting of every Post
        this.posts = this.posts.map(post => this.postService.fixPost(post));

        // Download meta property="og:image" value from first anchors of every Post
        this.posts.forEach(async post => {
          if (post.anchors[0] && !this.postService.checkIfImg(post.anchors[0]))
          {
            let resolver = await this.postService.getPage(post.anchors[0]).toPromise();
            let ogImgUrl = await this.postService.getOgImageUrl(resolver);
            let newAnchor = (ogImgUrl) ? ogImgUrl : null;
  
            post.anchors[0] = await newAnchor;
          }
        });
      });
    }
  }

  autosize(event: any):void {
    let el:HTMLElement = event.target;

    setTimeout(() => {
      el.style.cssText = 'height:auto;';
      // for box-sizing other than "content-box" use:
      // el.style.cssText = '-moz-box-sizing:content-box';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
    } ,0);
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    let newPost:Post = {
      id: 101,
      author_id: this.userService.getLoggedUserData().id,
      title: form.value.title,
      body: form.value.body,
      date: ""
    };

    console.log('New post', newPost);

    this.postService.addPost(newPost).subscribe(postArr => {
      console.log('Server response', postArr);
      
      let post:Post = postArr[0];
      post = this.postService.fixPost(post);

      let newPostArr:Post[] = [];
      newPostArr.push(post);

      newPostArr.forEach(async post => {
        if (!this.postService.checkIfImg(post.anchors[0]))
        {
          let resolver = await this.postService.getPage(post.anchors[0]).toPromise();
          let ogImgUrl = await this.postService.getOgImageUrl(resolver);
          let newAnchor = (ogImgUrl) ? ogImgUrl : null;

          post.anchors[0] = await newAnchor;
        }
      });

      this.posts.unshift(newPostArr[0]);

      this.alertMsgType = "Sukces!";
      this.alertType = 'success';
      this.alertMsg = 'Dodano post!';
      this.showAlert = true;

      form.reset();

      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }, err => {
      this.alertMsgType = "Błąd!";
      this.alertType = 'danger';
      this.alertMsg = 'Podczas dodawania posta wystąpił błąd';
      this.showAlert = true;
      console.log('Błąd', err);
    });
  }
  
}
