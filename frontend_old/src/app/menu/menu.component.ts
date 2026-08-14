import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs';


interface TreeNode {
  name: string;
  route?: string;
  llaveReporteBI?: string;
  children?: TreeNode[];
}
// Mejorar con un menu TREE, donde se crea mas automaticamente

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',

})

export class MenuComponent implements OnInit {


  constructor(private router: Router,
    private route: ActivatedRoute
  ) {
  }
  

  ngOnInit() {
  }
}
