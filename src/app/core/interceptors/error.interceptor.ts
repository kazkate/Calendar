import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(){}
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError((error:HttpErrorResponse)=>{
                    let errorMessage = '';
                    if(error.error instanceof ErrorEvent){
                        console.log('Ошибка на строне клиента');
                        errorMessage = `Ошибка ${error.error.message}`
                    }
                    else{
                        console.log('Ошибка сервера');
                        errorMessage = `Код ошибки ${error.status}, сообщение ${error.message}`;
                    }

                    console.log(errorMessage);
                    return throwError(()=>new Error(errorMessage));
                })
            )
    }
}