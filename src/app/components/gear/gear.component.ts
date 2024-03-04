import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-gear',
    standalone: true,
    imports: [],
    templateUrl: './gear.component.html',
    styleUrl: './gear.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GearComponent {}
