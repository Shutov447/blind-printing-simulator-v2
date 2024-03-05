import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GearComponent } from './components/gear/gear.component';
import { SOURCE_TEXTS_URL } from './shared/text/source-texts-url.token';
import { TextComponent } from './components/text/text.component';
import { TextService } from './shared/text/text.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        GearComponent,
        TextComponent,
        HttpClientModule,
        CommonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [TextService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
    readonly title = 'blind-printing-simulator-v2';

    private readonly destroy$ = new Subject<void>();
    private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
    readonly isLoading$ = this._isLoading$.asObservable();

    text = '';
    canClick = true;
    isStart = false;

    constructor(
        @Inject(SOURCE_TEXTS_URL) readonly textsUrl: string,
        private readonly cdr: ChangeDetectorRef,
        private readonly textService: TextService,
    ) {}

    onClick() {
        this.getStarted();
    }

    getStarted() {
        if (this.canClick) {
            this._isLoading$.next(true);
            this.textService
                .requestText$('assets/texts_for_typing.json')
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (texts) => {
                        this.text = texts[0].text;
                        this.cdr.markForCheck();
                    },
                    complete: () => {
                        this._isLoading$.next(false);
                        this.isStart = !this.isStart;
                        this.cdr.markForCheck();
                    },
                });
        }

        this.canClick = false;
    }

    ngOnDestroy() {
        this.isLoading$.pipe(takeUntil(this.destroy$));
        this._isLoading$.pipe(takeUntil(this.destroy$));

        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$.unsubscribe();
    }
}
