import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { IComponentData } from '../../shared/components-data/componet-data.interface';

@Component({
    selector: 'app-text-for-typing',
    standalone: true,
    imports: [],
    templateUrl: './text-for-typing.component.html',
    styleUrl: './text-for-typing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class TextForTypingComponent implements OnInit {
    @Input({ required: true }) componentsData: IComponentData | null = null;

    constructor(
        private readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnInit() {
        this.componentsData &&
            this.componentsDataService.addComponentData$(this.componentsData);
    }
}
