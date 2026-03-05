import { HttpClient } from "@angular/common/http";
import { ApiURL } from "../../environments/enviroments";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class GeneradorQRService {

    baseUrl = '/rest-api/';


    constructor(private http: HttpClient) { }
   

    generarQR(codigo: number) {
     
        const url = this.baseUrl + 'generadorQR/egreso-stock?codigo=' + codigo;
        console.log('URL de generación de QR: ', url);
        return this.http.get(url, {
            responseType: 'blob',
            observe: 'response'
        }).subscribe(response => {
            const blob = new Blob([response.body!], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `qr_${codigo}.pdf`;
            a.click();
            window.URL.revokeObjectURL(url);
        });

    }

    windowOpen(response: any, codigo?: number) {
        const blob = new Blob([response.body], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const name = response.headers.get('content-disposition')?.match(/filename="(.+)"/)?.[1] || `qr_${codigo || 'file'}.pdf`;

        if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) {
            (window.navigator as any).msSaveOrOpenBlob(blob, name);
        } else {
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        }
    }

}