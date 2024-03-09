import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { CommonModule } from '@angular/common';

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

    constructor(readonly componentsDataService: ComponentsDataService) {}

    ngOnInit() {
        this.componentData &&
            this.componentsDataService.addComponentData$(this.componentData);
    }
}
