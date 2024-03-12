import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    @HostBinding('style.display')
    private display: string = 'none';

    constructor(
        @Inject(ComponentsDataService)
        readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnInit() {
        this.componentsDataService.componentsData$
            .pipe(takeUntil(this.destroy$))
            .subscribe((componentsData) => {
                this.display = componentsData['app-intro'] ? 'flex' : 'none';
            });
    }

    @HostListener('click')
    onClick() {
        this.componentsDataService.showOnlyOneComponent('app-text-for-typing');
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
