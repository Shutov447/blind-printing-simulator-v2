import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { CommonModule } from '@angular/common';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { ComponentsDataSingletonService } from '../../shared/components-data/components-data-singleton.service';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class ResultComponent implements OnInit {
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
                this.display = componentsData['app-result'] ? 'flex' : 'none';
            },
        );
    }
}
