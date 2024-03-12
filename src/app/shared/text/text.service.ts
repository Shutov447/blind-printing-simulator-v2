import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IText } from './text.interface';
import { Text } from './text.type';
import { LoadingService } from '../loading/loading.service';
import { textRandomizer } from '../utils/text-randomizer';
import { sliceText } from '../utils/slice-text';

@Injectable({
    providedIn: 'platform',
})
export class TextService {
    private readonly _slicedText$ = new BehaviorSubject<string[]>([]);
    readonly slicedText$ = this._slicedText$.asObservable();

    private readonly _textForTypingLength$ = new BehaviorSubject<number>(0);
    readonly textForTypingLength$ = this._textForTypingLength$.asObservable();

    private texts: IText[] = [];

    constructor(
        @Inject(HttpClient)
        private readonly http: HttpClient,
        @Inject(LoadingService)
        private readonly loadingService: LoadingService,
    ) {}

    requestText$(url: string, type: Text): Observable<string[]> {
        if (!this.texts.length) {
            this.loadingService.load$(true);
            this.http.get<IText[]>(url).subscribe({
                next: (texts) => {
                    this.chooseText(texts, type);
                    this.texts = texts;
                },
                complete: () => {
                    this.loadingService.load$(false);
                },
            });
        }

        return this.slicedText$;
    }

    private chooseText(texts: IText[], type: Text) {
        let currentText: IText['text'] = '';

        switch (type) {
            case 'random':
                currentText = textRandomizer(texts);
                break;
            case 'fromStart':
                currentText = 'еще не готово';
                break;
            case 'fromEnd':
                currentText = 'еще не готово';
                break;
            case 'id':
                currentText = 'еще не готово';
                break;
        }

        const currentSlicedText = sliceText(currentText);
        this._slicedText$.next(currentSlicedText);
    }

    setTextForTypingLength$(textForTypingLength: number) {
        this._textForTypingLength$.next(textForTypingLength);
    }
}
