import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IText } from './text.interface';

@Injectable({
    providedIn: 'root',
})
export class TextService {
    constructor(private readonly http: HttpClient) {}

    // getText(type: Text) {
    //     console.log(type);
    //     return this.requestText$('assets/texts_for_typing.json');
    //     //     switch (type) {
    //     //         case 'random':
    //     //             break;
    //     //         case 'id':
    //     //             break;
    //     //         case 'fromStart':
    //     //             break;
    //     //         case 'fromEnd':
    //     //             break;
    //     //     }
    // }

    requestText$(url: string): Observable<IText[]> {
        return this.http.get<IText[]>(url);
    }
}
