import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
} from '@angular/core';
import { TimerService } from '../../shared/timer/timer.service';

@Component({
    selector: 'app-timer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timer.component.html',
    styleUrl: './timer.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnChanges, OnDestroy {
    @Input({ required: true }) isTimeCounting: boolean | null = null;

    private timerID = 0;
    minuts = 0;
    seconds = 0;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        @Inject(TimerService) private readonly timerService: TimerService,
    ) {}

    ngOnChanges({ isTimeCounting }: SimpleChanges) {
        if (isTimeCounting.currentValue) {
            this.timerID = window.setInterval(() => this.timeCounting(), 1000);
        }
    }

    ngOnDestroy() {
        const resultSeconds = this.minuts * 60 + this.seconds;
        this.timerService.setResultTimeInSeconds(resultSeconds);
        clearInterval(this.timerID);
    }

    private timeCounting() {
        this.seconds++;

        if (this.seconds === 60) {
            this.minuts++;
            this.seconds = 0;
        }

        if (this.minuts === 60) {
            clearInterval(this.timerID);
        }

        this.cdr.markForCheck();
    }
}
