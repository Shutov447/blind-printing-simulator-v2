import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { CommonModule } from '@angular/common';
import { ComponentsDataSingletonService } from '../../shared/components-data/components-data-singleton.service';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class IntroComponent implements OnInit {
    @Input({ required: true }) componentData: IComponentData | null = null;
    @HostBinding('style.display')
    private display: string = 'none';

    constructor(
        readonly componentsDataService: ComponentsDataService,
        readonly componentsDataSingletonService: ComponentsDataSingletonService,
    ) {}

    ngOnInit() {
        this.componentData &&
            this.componentsDataService.addComponentData$(this.componentData);
        this.componentsDataSingletonService.componentsData$.subscribe(
            (componentsData) => {
                this.display = componentsData['app-intro'] ? 'flex' : 'none';
            },
        );
    }

    @HostListener('click')
    onClick() {
        this.componentsDataService.showOnlyOneComponent('app-text-for-typing');
    }
}
