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
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TimerService } from '../../shared/timer/timer.service';
import { TextService } from '../../shared/text/text.service';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    private readonly _resultSpeed$ = new BehaviorSubject<number>(0);
    readonly resultSpeed$ = this._resultSpeed$.asObservable();

    readonly textForTypingLength$ = this.textService.textForTypingLength$.pipe(
        takeUntil(this.destroy$),
    );

    readonly resultTimeInMinuts$ = this.timerService.resultTimeInMinuts$.pipe(
        takeUntil(this.destroy$),
    );

    @HostBinding('style.display')
    private display: string = 'none';

    constructor(
        @Inject(ComponentsDataService)
        readonly componentsDataService: ComponentsDataService,
        @Inject(TimerService) private readonly timerService: TimerService,
        @Inject(TextService) private readonly textService: TextService,
    ) {}

    ngOnInit() {
        this.componentsDataService.componentsData$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (componentsData) =>
                    (this.display = componentsData['app-result']
                        ? 'flex'
                        : 'none'),
            );

        this.textForTypingLength$.subscribe((textForTypingLength) => {
            this.resultTimeInMinuts$.subscribe((resultTimeInMinuts) => {
                const resultSpeed = Math.round(
                    textForTypingLength / resultTimeInMinuts,
                );
                this._resultSpeed$.next(resultSpeed);
            });
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('click') private onClick() {
        this.componentsDataService.showOnlyOneComponent('app-text-for-typing');
    }
}
