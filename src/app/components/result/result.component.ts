import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { CommonModule } from '@angular/common';
import { IComponentData } from '../../shared/components-data/componet-data.interface';

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

    constructor(readonly componentsDataService: ComponentsDataService) {}

    ngOnInit() {
        this.componentData &&
            this.componentsDataService.addComponentData$(this.componentData);
    }
}
