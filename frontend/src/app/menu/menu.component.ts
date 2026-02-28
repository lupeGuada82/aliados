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

const TREE_DATA: TreeNode[] = [

  {
    name: 'CONTROL DE STOCK',
   route: 'consultaStock'

  },
  {
    name: 'EMPLEADOS',
    children: [
      {
        name: 'Consultar Empleados',
        route: 'consultaEmpleados'
      },
  
    ]
  },
   {
    name: 'FERIADOS',
    children: [
      {
        name: 'Consultar Feriados',
        route: 'consultaFeriados'
      },
  
    ]
  }
];

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',

})

export class MenuComponent implements OnInit {


  treeControl = new NestedTreeControl<TreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  selectedNode: TreeNode | null = null;

  constructor(private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataSource.data = TREE_DATA;
  }
  

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.getBaseRoute(this.router.url);

      if (currentRoute === 'inicio') {
        this.clearSelection(); // limpiar selección
      } else {
        this.setSelectedNodeByRoute(currentRoute);
      }
    });

    // También en carga inicial
    const currentRoute = this.getBaseRoute(this.router.url);
    if (currentRoute === 'inicio') {
      this.clearSelection();
    } else {
      this.setSelectedNodeByRoute(currentRoute);
    }
  }
  clearSelection() {
    this.selectedNode = null;
    this.treeControl.collapseAll(); // opcional: colapsar todo
  }

  getBaseRoute(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1] || ''; 
  }


  setSelectedNodeByRoute(url: string) {
    const findNode = (nodes: TreeNode[]): TreeNode | null => {
      for (const node of nodes) {
        if (node.route && url === node.route) {
          return node;
        } else if (node.children) {
          const child = findNode(node.children);
          if (child) return child;
        }
      }
      return null;
    };

    const found = findNode(TREE_DATA);
    if (found) {
      this.selectedNode = found;
      this.expandToNode(found, TREE_DATA);
    }
  }

  expandToNode(target: TreeNode, nodes: TreeNode[], path: TreeNode[] = []): boolean {
    for (let node of nodes) {
      const currentPath = [...path, node];

      if (node === target) {
        // Expandir todos los padres
        currentPath.slice(0, -1).forEach(parent => this.treeControl.expand(parent));
        return true;
      }

      if (node.children) {
        const found = this.expandToNode(target, node.children, currentPath);
        if (found) return true;
      }
    }

    return false;
  }


  hasChild = (_: number, node: TreeNode) => node.children && node.children.length > 0;

  navigate(node: TreeNode) {
    this.selectedNode = node; // <- Seleccionamos el nodo
    if (node.route)
      this.router.navigate([node.route]);
  }



  onSelectNode(node: TreeNode): void {
    this.selectedNode = node;
  }

}
