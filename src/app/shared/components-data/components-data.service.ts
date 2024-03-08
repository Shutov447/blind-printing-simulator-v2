import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IComponentsData } from './components-data.interface';
import { IComponentData } from './componet-data.interface';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataService {
    private readonly currentComponentsData: IComponentsData = {};
    private readonly _componentsData$ = new BehaviorSubject<IComponentsData>(
        this.currentComponentsData,
    );
    readonly componentsData$ = this._componentsData$.asObservable();

    addComponentData$(componentData: IComponentData) {
        this.currentComponentsData[componentData.name] = componentData.isShow;
        this._componentsData$.next(this.currentComponentsData);
        // console.log(this.currentComponentsData);
    }
}
