import { Component, OnInit } from '@angular/core';
import {NewsapiCrudService} from "../../utilis/newsapi-crud.service";
import {Article} from "../../models/article";
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  items : Article[] =[];
  backup : Article[] =[];
  rangeDates: Date[] | undefined;

  readonly campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });

  constructor(private newsservice:NewsapiCrudService) { }

  ngOnInit(): void {

  }

  filterResults(value: string) {
    this.newsservice.getEverything('https://newsapi.org/v2/everything',value).subscribe(
      res => {
        this.items = res.articles
        this.backup = res.articles
      }
    );
  }

  updateStartDate(event:any) {
    console.log(typeof event.value);
  }

  filterBySourceResults(value: string) {
    this.items = this.backup;
    if (value && value.trim()!=''){
      this.items = this.items.filter(res => {
        return res.source.name.toLowerCase().trim().includes( value.toLowerCase().trim());
      });
    }
  }
  filterByDateRangeResults(value:string){
  /*  let startDate=formatDate(this.campaignOne.value.start, 'yyyy-MM-dd', 'en_US');
    let endDate=formatDate(this.campaignOne.value.end, 'yyyy-MM-dd', 'en_US');
    this.newsservice.getEverythingFilterByDateRange('https://newsapi.org/v2/everything',
      value,startDate,endDate)
      .subscribe(
        res => {
          console.log(res)
          this.items = res.articles
          this.backup = res.articles
        }
      );*/
  }
}
