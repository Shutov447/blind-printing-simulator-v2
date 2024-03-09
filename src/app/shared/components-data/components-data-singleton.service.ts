import { Injectable } from '@angular/core';
import { IComponentsData } from './components-data.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataSingletonService {
    private readonly _componentsData: IComponentsData = {};
    private readonly _componentsData$ = new BehaviorSubject<IComponentsData>(
        this._componentsData,
    );
    readonly componentsData$ = this._componentsData$.asObservable();

    get componentsData() {
        return this._componentsData;
    }

    updateComponentsData$(componentsData: IComponentsData) {
        this._componentsData$.next(componentsData);
    }
}
