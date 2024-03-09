import { Injectable } from '@angular/core';
import { IComponentsData } from './components-data.interface';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataSingletonService {
    private readonly _componentsData: IComponentsData = {};

    get componentsData() {
        return this._componentsData;
    }
}
