import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiURL } from "../../environments/enviroments";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class GeneradorQRService {

    baseUrl = '/rest-api/';


    constructor(private http: HttpClient) { }


    generarQR(producto: any) {

       let selected:any[] = [];
       selected.push(producto);
       this.generarQRs(selected);

    }

    generarQRs(selected: any) {
        const url = this.baseUrl + 'generadorQR/egreso-stock';
        const codigos = selected.map((item: any) => item.codigo);


        return this.http.post(url, codigos, {
            responseType: 'blob',
            observe: 'response'
        }).subscribe(response => {

            const blob = new Blob([response.body!], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const fileName = 'qr_productos_egreso.pdf';

            if ((window.navigator as any).msSaveOrOpenBlob) {
                // Para IE/Edge antiguos
                (window.navigator as any).msSaveOrOpenBlob(blob, fileName);
            } else {
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName; 
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => window.URL.revokeObjectURL(url), 100);
            }
        });
    }


}