import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class HttpConfigInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestWithHeaders = request.clone({
            headers: new HttpHeaders({
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Origin': '*',
                'server': 'cloudflare-nginx'
            })
        });

        return next.handle(requestWithHeaders);
    }
}

