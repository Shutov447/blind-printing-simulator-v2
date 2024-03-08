import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { IComponentsData } from '../../shared/components-data/componet-data.interface';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class ResultComponent implements OnInit {
    @Input({ required: true }) componentsData: IComponentsData | null = null;

    constructor(
        private readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnInit() {
        this.componentsData &&
            this.componentsDataService.setComponentsData$(this.componentsData);
    }
}
