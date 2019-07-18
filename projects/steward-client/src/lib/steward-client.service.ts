import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ResponseWrapper } from './entities/wrappers/response-wrapper';

export class StewardConfig {
    base_url: string;
    access_token?: string;
    headers?: HttpHeaders;
}

@Injectable()
export class StewardClientService<T, E> {

    private headers: HttpHeaders;
    token: string;
    base_url: string = "/";

    constructor(private http: HttpClient, private config: StewardConfig) {
        this.base_url = config.base_url;
        if (config.headers) {
            this.headers = config.headers.append('Content-Type', 'application/json; charset=utf-8');
        } else {
            this.headers = new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            });
        }
        if (config.access_token) {//append access token if the environment has access token
            this.headers = this.headers.append('Authorization', "Bearer " + config.access_token);
        }
    }

    /**
     *  Used to update authorization token. Currently supports bearer token
     * 
     * @param token 
     */
    setToken(token: string){
        if (this.config.access_token) {//update token header
            this.headers.set("Authorization", "Bearer " + token);
        } else{//append access token if the environment has access token            
            this.headers = this.headers.append('Authorization', "Bearer " + token);
        }
    }
    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     * @param data a valid object
     */
    post(endpoint: string, data: T): Observable<ResponseWrapper<E>> {

        return this.http.post(this.serviceURL(endpoint), JSON.stringify(data), { headers: this.headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Used to handle http post requests
     * @param endpoint expects either an endpoint or url
     */
    put(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        return this.http.put(this.serviceURL(endpoint), JSON.stringify(data), { headers: this.headers }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http delete request
     * @param endpoint expects either an endpoint or url
     * @param data 
     */
    delete(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        return this.http.request('delete', this.serviceURL(endpoint), { headers: this.headers, body: JSON.stringify(data) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http get request
     * @param endpoint expects either an endpoint or url
     * @param data 
     */
    get(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Fetch a file
     * @param endpoint expects either an endpoint or url
     * @param data 
     */
    getFile(endpoint: string, data?: Map<string, string>): Observable<ResponseWrapper<E>> {
        const options = {
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint) + '?access_token=' + this.token, options).pipe(
            catchError(this.handleError<any>())
        );
    }
    /**
     * if
     * @param endpoint expects either an endpoint or url
     * @param data 
     * @param headers 
     */
    postFormData(endpoint: string, data: T, headers?: HttpHeaders): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if(this.headers.get("Authorization") && (!headers)){
            headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
        } else if(!headers){
            headers = new HttpHeaders();
        }
        return this.http.post(this.serviceURL(endpoint), formData, { headers: headers}).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * handle http form data request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid object
     */
    postFormDataMultipart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.post(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Handles http put form data request
     * @param endpoint expects either an endpoint or url
     * @param data valid object
     */
    putFormDataMultiPart(endpoint: string, data: T): Observable<ResponseWrapper<E>> {
        const formData: FormData = new FormData();
        Object.keys(data).forEach((key) => {
            if (Array.isArray(data[key])) {
                data[key].forEach(k2 => {
                    formData.append(key, k2);
                });
            } else {
                formData.append(key, data[key]);
            }
        });
        return this.http.put(this.serviceURL(endpoint), formData, { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.token }) }).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Convert map to HttpParams
     * @param data 
     */
    private getHttpParams(data: Map<string, string>): HttpParams {
        if (data == undefined) {
            return new HttpParams();
        }
        let httpParams: HttpParams = new HttpParams();
        data.forEach((value: string, key: string) => {
            httpParams = httpParams.append(key, value);
        });
        return httpParams;
    }
    /**
     * Used to catch exception thrown by http client returns internal server error
     * if status 500 is encountered
     */
    private handleError<ResponseWrapper>() {
        return (error: HttpErrorResponse): Observable<any> => {
            const res = new ResponseWrapper();
            //            console.error(error); // log to console instead
            if (error.status == 500) {
                res.status = error.status;
                res.message = 'Sorry internal server error occured please try again later';
            } else {
                res.status = error.status;
                res.message = error.error.message;
                res.data = error.error.data;
            }
            return of(res);
        };
    }
    /**
     * Used to render action buttons
     */
    static renderMore(id: any) {
        return '<div class=\'actions-buttons center\' id=\'' + id + '\'><i class=\'fa fa-check\' title=\'Approve\'></i> <i class=\'fa fa-ban\' title=\'Decline\'></i></div>';
    }

    /**
     * Handles datatable request
     * @param endpoint expects either an endpoint or url
     * @param data expects a valid map
     */
    public intiateDataTable(endpoint: string, data?: Map<string, string>) {
        const options = {
            headers: this.headers,
            params: this.getHttpParams(data)
        };
        return this.http.get(this.serviceURL(endpoint), options).pipe(
            catchError(this.handleError<any>())
        );
    }

    /**
     * Used to validate if a string is a valid URL
     * @param url
     */
    public isURL(url: string): boolean{
        try {
            new URL(url);
            return true;
          } catch (_) {
            return false;  
          }
    }

    /**
     * If the url parameter is an endpoint it appends to the base url
     * @param url 
     * @see base_url
     */
    private serviceURL(url: string): string{
        return (this.isURL(url)) ? url : this.base_url + url;
    }
}
