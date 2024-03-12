import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    private readonly _resultTimeInMinuts$ = new BehaviorSubject<number>(0);
    readonly resultTimeInMinuts$ = this._resultTimeInMinuts$.asObservable();

    setResultTimeInSeconds(resultTime: number) {
        const minuts = +(resultTime / 60).toFixed(2);
        this._resultTimeInMinuts$.next(minuts);
    }
}
