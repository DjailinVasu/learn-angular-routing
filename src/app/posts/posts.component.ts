import { Component, OnInit } from '@angular/core';
import {PostsService} from '../posts.service'
import { Post } from './../posts.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts:Post[];

  showIds = false;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.posts = this.postsService.posts;

    this.route.queryParams.subscribe((params: Params)=> {
        this.showIds = !!params.showIds
    })

    this.route.fragment.subscribe(fragment => {
      console.log('fragment', fragment)
    })
  }

  showIdsProgram() {
    this.router.navigate(['/posts'], {
      queryParams: {
        showIds: true
      },
      fragment : 'program-fragment'
    })
  }

}
