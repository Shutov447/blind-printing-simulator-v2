import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IComponentsData } from './components-data.interface';
import { IComponentData } from './componet-data.interface';
import { ComponentsDataSingletonService } from './components-data-singleton.service';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataService {
    private readonly _componentsData$ = new BehaviorSubject<IComponentsData>(
        {},
    );
    readonly componentsData$ = this._componentsData$.asObservable();

    constructor(
        private readonly componentsDataSingletonService: ComponentsDataSingletonService,
    ) {}

    addComponentData$(componentData: IComponentData) {
        this.componentsDataSingletonService.componentsData[componentData.name] =
            componentData.isShow;
        this._componentsData$.next(
            this.componentsDataSingletonService.componentsData,
        );
    }
}
