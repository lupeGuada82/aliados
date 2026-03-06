import { Directive, OnInit } from '@angular/core';
import { TableConfiguration } from '../table/utils/utils';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../service/base.service';


@Directive()
export abstract class AbstractEntityComponent implements  OnInit {

  displayedColumns: any[] = [];
  data: MatTableDataSource<any> ;
  settings = new TableConfiguration();

  constructor(protected route: ActivatedRoute, protected router: Router, protected titleService: Title,private service: BaseService<any>) {


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
  protected abstract getPath(): string;

  /***TODO lo que viene debajo puede ir en la super */
  protected  loadData() {
    this.service.getAll(this.getPath()).subscribe((empleados) => {
      this.data = new MatTableDataSource(empleados);
      this.createTable();
    }
    );
  }
   onAddConfirm(event) {
    let newData = event.newData;
    this.service.add(this.getPath(), newData).subscribe((data) => {
        event.confirm.resolve(data);
      
    });
  }


  onEditConfirm(event) {
    this.service.update(this.getPath(), event.data).subscribe({
      next: (data) => {
        event.confirm.resolve(data);
      }
    });
  }

}
