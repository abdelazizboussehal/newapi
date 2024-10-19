import { Component, OnInit } from '@angular/core';
import {NewsapiCrudService} from "../../utilis/newsapi-crud.service";
import {Response} from "../../models/response";
import {Article} from "../../models/article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  items : Article[] =[];

  constructor(private newsservice:NewsapiCrudService) { }

  ngOnInit(): void {

  }

  filterResults(value: string) {
    this.newsservice.getEverything('https://newsapi.org/v2/everything',value).subscribe(
      res => {
        this.items = res.articles
      }
    )
  }
}
