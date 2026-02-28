import { Directive, OnInit } from '@angular/core';
import { TableConfiguration } from '../table/utils/utils';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';


@Directive()
export abstract class AbstractEntityComponent implements  OnInit {

  displayedColumns: any[] = [];
  data= new MatTableDataSource<any>();
  settings = new TableConfiguration();

  constructor(protected route: ActivatedRoute, protected router: Router, protected titleService: Title) {


    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }


  ngOnInit(): void {
    this.titleService.setTitle(this.getTitle());
    this.loadData();
  }
  protected abstract createTable(): void;
  protected abstract getTitle(): string;
  protected abstract getEntityPath(): string;

  protected abstract loadData();

}
