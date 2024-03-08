import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
    readonly isLoading$ = this._isLoading$.asObservable();

    load$(flag: boolean) {
        this._isLoading$.next(flag);
    }

    unsub() {
        this._isLoading$.unsubscribe();
    }
}
