import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IText } from './text.interface';

@Injectable({
    providedIn: 'root',
})
export class TextService {
    private readonly _texts$ = new BehaviorSubject<IText['text'] | null>(null);
    readonly texts$ = this._texts$.asObservable();

    constructor(private readonly http: HttpClient) {}

    requestText$(url: string): Observable<IText[]> {
        return this.http.get<IText[]>(url);
    }

    setText$(text: IText['text']) {
        this._texts$.next(text);
    }
}
