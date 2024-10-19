import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: any;

  constructor() {
    this.article = {
      title:'Chelsea',
      content:'I want to use 5000 instead of 4200.\n' +
        '\n' +
        'I have tried to create a file on root name ember-cli and put JSON according to the code below',
      urlToImage:'https://i0.wp.com/newsdata.io/blog/wp-content/uploads/2024/01/Snipaste_2021-11-28_13-55-49.jpg?fit=701%2C351&ssl=1',
      publishedAt: new Date()
    }
  }

  ngOnInit(): void {
  }

  readMore() {

  }
}
