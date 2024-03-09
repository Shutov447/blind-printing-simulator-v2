import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IComponentsData } from './components-data.interface';
import { IComponentData } from './componet-data.interface';
import { ComponentsDataSingletonService } from './components-data-singleton.service';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataService {
    private readonly storeComponentsData =
        this.componentsDataSingletonService.componentsData;
    private readonly _componentsData$ = new BehaviorSubject<IComponentsData>(
        {},
    );
    readonly componentsData$ = this._componentsData$.asObservable();

    constructor(
        private readonly componentsDataSingletonService: ComponentsDataSingletonService,
    ) {}

    addComponentData$(componentData: IComponentData) {
        this.storeComponentsData[componentData.name] = componentData.isShow;
        this._componentsData$.next(this.storeComponentsData);
    }

    showOnlyOneComponent(componentName: IComponentData['name']) {
        for (const currentComponentName in this.storeComponentsData) {
            if (
                Object.prototype.hasOwnProperty.call(
                    this.storeComponentsData,
                    currentComponentName,
                )
            ) {
                if (currentComponentName !== componentName) {
                    this.storeComponentsData[currentComponentName] = false;
                } else {
                    this.storeComponentsData[currentComponentName] = true;
                }
            }
        }

        this.componentsDataSingletonService.updateComponentsData$(
            this.storeComponentsData,
        );
    }
}
