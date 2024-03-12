import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
} from '@angular/core';
import { TextForTypingComponent } from '../text-for-typing/text-for-typing.component';
import { IntroComponent } from '../intro/intro.component';
import { ResultComponent } from '../result/result.component';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { CommonModule } from '@angular/common';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IComponentsData } from '../../shared/components-data/components-data.interface';
import { TextService } from '../../shared/text/text.service';
@Component({
    selector: 'app-text',
    standalone: true,
    templateUrl: './text.component.html',
    styleUrl: './text.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        TextForTypingComponent,
        IntroComponent,
        ResultComponent,
    ],
    providers: [TextService],
})
export class TextComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();
    readonly componentsData$ = this.componentsDataService.componentsData$.pipe(
        takeUntil(this.destroy$),
    );

    private readonly initComponents: string[] = [];

    constructor(
        @Inject(ComponentsDataService)
        readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addInitComponentData(
        componentData: IComponentData,
    ): Observable<IComponentsData> {
        if (this.initComponents.includes(componentData.name))
            return this.componentsData$;
        this.initComponents.push(componentData.name);
        this.componentsDataService.addComponentData$(componentData);

        return this.componentsData$;
    }
}
