import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private readonly _isLoading$ = new BehaviorSubject<boolean | null>(false);
    readonly isLoading$ = this._isLoading$.asObservable();

    load$(isLoad: boolean) {
        this._isLoading$.next(isLoad);
    }
}
