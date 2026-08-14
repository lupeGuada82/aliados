import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MessageService } from './message/message.service';
import { AuthService } from './service/auth.service';

@Injectable()
export class PipersErrorHandler implements ErrorHandler {

    constructor(private messagesService: MessageService, private authService: AuthService, private zone: NgZone) {
    }

    public handleError(theErrorUpper: any): void {
        let theError = theErrorUpper;
        console.log(theErrorUpper)
        if (theError.rejection) {
            theError = theErrorUpper.rejection;
        }
        let error = theError;
        if (error.error) {
            error = error.error;
        }
        if (theError.status === 500) {
            this.zone.run(() => this.messagesService.error(error.error));
        } else if (theError.status == 0 || theError.status == 302) {
            this.zone.run(() => this.messagesService.error(['El está deslogueado. Vuelva a ingresar']));
            setTimeout(() => {
                this.authService.logout();
            },2000);
                
        } else if ((theError.error && (theError.error + '').includes('SyntaxError:')) || (theError.error && theError.error.error && (theError.error.error + '').includes('SyntaxError:'))) {
            this.zone.run(() => this.messagesService.error(['El está deslogueado. Vuelva a ingresar']));
            setTimeout(() => {
                this.authService.logout();
            },2000);
        } else {
            this.zone.run(() => this.messagesService.error(['Error inesperado. Vuelva a ingresar a pipers.'
                ]));
        }
    }
}