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

    constructor(readonly componentsDataService: ComponentsDataService) {}

    ngOnInit() {
        this.componentData &&
            this.componentsDataService.addComponentData$(this.componentData);
        // console.log('intro init');
    }
}
