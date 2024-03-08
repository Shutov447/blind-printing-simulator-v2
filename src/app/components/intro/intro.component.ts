import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { IComponentData } from '../../shared/components-data/componet-data.interface';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ComponentsDataService],
})
export class IntroComponent implements OnInit {
    @Input({ required: true }) componentsData: IComponentData | null = null;

    constructor(
        private readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnInit() {
        this.componentsData &&
            this.componentsDataService.addComponentData$(this.componentsData);
    }
}
