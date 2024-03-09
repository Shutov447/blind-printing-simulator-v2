import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { CommonModule } from '@angular/common';
import { ComponentsDataSingletonService } from '../../shared/components-data/components-data-singleton.service';

@Component({
    selector: 'app-text-for-typing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './text-for-typing.component.html',
    styleUrl: './text-for-typing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class TextForTypingComponent implements OnInit {
    @Input({ required: true }) componentData: IComponentData | null = null;
    @HostBinding('style.display')
    private display: string = 'none';

    constructor(
        private readonly componentsDataService: ComponentsDataService,
        readonly componentsDataSingletonService: ComponentsDataSingletonService,
    ) {}

    ngOnInit() {
        this.componentData &&
            this.componentsDataService.addComponentData$(this.componentData);
        this.componentsDataSingletonService.componentsData$.subscribe(
            (componentsData) => {
                this.display = componentsData['app-text-for-typing']
                    ? 'flex'
                    : 'none';
            },
        );
    }
}
