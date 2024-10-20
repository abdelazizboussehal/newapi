import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() article: any ;

  constructor() {

  }

  ngOnInit(): void {
  }

  readMore() {
    window.open(this.article.url, "_blank");
  }
}
