import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IComponentData } from './componet-data.interface';
import { IComponentsData } from './components-data.interface';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDataService {
    private readonly _componentData$ =
        new BehaviorSubject<IComponentData | null>(null);
    readonly componentData$ = this._componentData$.asObservable();
    private readonly currentComponentsData: IComponentsData | null = null;

    // addComponentData$(componentData: IComponentData) {
    //     // можно еще попробовать закостылить: все true сначала и они инициализиуются, но я их скрою изначально, а потом все false после попадания в поток и я это скрытие уберу в app-text у инпутов
    //     this._componentsData$.next(this.currentComponentsData);
    // }
}
