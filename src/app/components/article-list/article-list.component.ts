import { Component, OnInit } from '@angular/core';
import {NewsapiCrudService} from "../../utilis/newsapi-crud.service";
import {Article} from "../../models/article";
import {formatDate} from "@angular/common";
import {AutoCompleteCompleteEvent} from "primeng/autocomplete";


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  items : Article[] =[];
  backup : Article[] =[];
  rangeDates: Date[] =[new Date(),new Date()];
  itemsSuggestion: any[] | undefined;

  selectedItem: any;

  suggestions: any[] =[];

  search(event: AutoCompleteCompleteEvent) {
    console.log('ok')
    this.suggestions = this.backup.map(item => item.source.name);
  }
  loading= false;
  filterList: string[]=[];

  constructor(private newsService:NewsapiCrudService) { }

  ngOnInit(): void {

  }

  filterResults(value: string) {
    if(value.trim()!=''){
      this.loading =true;
      if(this.rangeDates != undefined && this.filterList.includes('ByDate')){
        let startDate=formatDate(this.rangeDates[0], 'yyyy-MM-dd', 'en_US');
        let endDate=formatDate(this.rangeDates[1], 'yyyy-MM-dd', 'en_US');
        this.newsService.getEverythingFilterByDateRange('https://newsapi.org/v2/everything',
          value,startDate,endDate)
          .subscribe (
            res => {
              this.items = res.articles.map((element, index) => ({
                ...element,
                id: index + 1
              }));
              this.backup = this.items;
              this.suggestions = this.backup.map(item => item.source.name);
              this.loading =false;
              if(this.selectedItem && this.selectedItem.trim()!='' && this.filterList.includes('BySource')){
                this.filterBySourceResults(this.selectedItem);
              }
            }
          );
      }
      else{
        console.log('here')
        this.newsService.getEverything('https://newsapi.org/v2/everything',value).subscribe(
          res => {
            this.items = res.articles.map((element, index) => ({
              ...element,
              id: index + 1
            }));
            this.backup = this.items;
            this.suggestions = this.backup.map(item => item.source.name);
            this.loading =false;
            if(this.selectedItem && this.selectedItem.trim()!=''){
              this.filterBySourceResults(this.selectedItem);
            }
          },
          error => {
            console.log('aziz'+error);
          }
        );
      }

    }
  }
  //https://www.youtube.com/watch?v=ywPOYBDlQoo
  trackById(index:number){
    return index;
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
}
