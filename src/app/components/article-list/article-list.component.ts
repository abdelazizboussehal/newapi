import { Component, OnInit } from '@angular/core';
import {NewsapiCrudService} from "../../utilis/newsapi-crud.service";
import {Article} from "../../models/article";
import {FormControl, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";
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
  itemsSuggestion: any[] | undefined;

  selectedItem: any;

  suggestions: any[] =[];

  search(event: AutoCompleteCompleteEvent) {
    this.suggestions = this.backup.map(item => item.source.name);
  }
  loading= false;

  constructor(private newsService:NewsapiCrudService) { }

  ngOnInit(): void {

  }

  filterResults(value: string) {
    if(value.trim()!=''){
      this.loading =true;
      if(this.rangeDates != undefined){
        let startDate=formatDate(this.rangeDates[0], 'yyyy-MM-dd', 'en_US');
        let endDate=formatDate(this.rangeDates[1], 'yyyy-MM-dd', 'en_US');
        this.newsService.getEverythingFilterByDateRange('https://newsapi.org/v2/everything',
          value,startDate,endDate)
          .subscribe(
            res => {
              console.log(res)
              this.items = res.articles;
              this.backup = res.articles;
              this.suggestions = this.backup.map(item => item.source.name);
              this.loading =true;
            }
          );
      }
      else{
        this.newsService.getEverything('https://newsapi.org/v2/everything',value).subscribe(
          res => {
            this.items = res.articles;
            this.backup = res.articles;
            this.suggestions = this.backup.map(item => item.source.name);
            this.loading =false;
          }
        );
      }

    }
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
    this.newsService.getEverythingFilterByDateRange('https://newsapi.org/v2/everything',
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
