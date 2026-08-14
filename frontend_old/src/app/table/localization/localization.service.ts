import { Injectable } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";

@Injectable()
export class LocatizationService {
    translateMatPaginator(paginator: MatPaginator, label:string) {
        paginator._intl.firstPageLabel = 'Primera';
        paginator._intl.itemsPerPageLabel =label;
        paginator._intl.lastPageLabel = 'Última';
        paginator._intl.nextPageLabel = 'Siguiente';
        paginator._intl.previousPageLabel = 'Anterior';
        paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            const start = page * pageSize + 1;
            const end = (page + 1) * pageSize;
            // aca si end > length va lenght
            return `${start} - ${end} de ${length}`;
          };
      }

}