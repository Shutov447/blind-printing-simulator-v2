import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TextService } from '../../shared/text/text.service';
import { exceptions } from '../../shared/exceptions/exceptions.set';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../shared/loading/loading.service';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { TimerComponent } from '../timer/timer.component';
import { isAliasKey } from '../../shared/utils/is-alias-key';
import { isSpaceKey } from '../../shared/utils/is-space-key';

@Component({
    selector: 'app-text-for-typing',
    standalone: true,
    imports: [CommonModule, MatProgressSpinnerModule, TimerComponent],
    templateUrl: './text-for-typing.component.html',
    styleUrl: './text-for-typing.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextForTypingComponent implements OnInit, OnDestroy {
    private readonly destroy$ = new Subject<void>();

    readonly isLoading$ = this.loadingService.isLoading$.pipe(
        takeUntil(this.destroy$),
    );

    readonly componentsData$ = this.componentsDataService.componentsData$.pipe(
        takeUntil(this.destroy$),
    );

    readonly textForTyping$ = this.textService
        .requestText$('assets/texts_for_typing.json', 'random')
        .pipe(takeUntil(this.destroy$));

    @ViewChild('inputTextForTyping', {
        read: ElementRef,
        static: true,
    })
    private readonly inputTextForTyping: ElementRef<HTMLInputElement> | null =
        null;

    @ViewChild('textForTyping', {
        read: ElementRef,
        static: true,
    })
    private readonly textForTyping: ElementRef<HTMLDivElement> | null = null;

    @HostBinding('style.display')
    private display: string = 'none';

    private currentLetter = 0;
    private timerInputTextForTyping = 0;
    private letters: HTMLCollection | undefined;

    isTimeCounting = false;
    canType = false;

    constructor(
        @Inject(TextService) private readonly textService: TextService,
        @Inject(LoadingService) public readonly loadingService: LoadingService,
        @Inject(ComponentsDataService)
        private readonly componentsDataService: ComponentsDataService,
    ) {}

    ngOnInit() {
        this.componentsData$.subscribe((componentsData) => {
            if (componentsData['app-text-for-typing']) {
                this.display = 'flex';
            }
        });
        this.timerInputTextForTyping = window.setTimeout(() => {
            this.inputTextForTyping?.nativeElement.focus();
            this.letters = this.textForTyping?.nativeElement.children;
        });
        this.isLoading$.subscribe((isLoad) => {
            !isLoad && (this.canType = true);
        });
    }

    ngOnDestroy() {
        clearTimeout(this.timerInputTextForTyping);
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostListener('click') private onClick() {
        this.inputTextForTyping?.nativeElement.focus();
    }

    onKeydown(event: KeyboardEvent) {
        if (!this.canType) return;

        this.letterValidation(event.key);
        this.currentLetter === 1 && (this.isTimeCounting = true);
        this.checkEndText();
    }

    private letterValidation(key: KeyboardEvent['key']) {
        if (this.letters) {
            const letter = this.letters[this.currentLetter].textContent!;
            const isSpace = isSpaceKey(key, letter);

            if (isSpace) {
                this.letters[this.currentLetter].className = 'valid-letter';
                this.currentLetter++;

                return;
            }
            if (
                isAliasKey(['е', 'ё'], key, letter) ||
                isAliasKey(['Е', 'Ё'], key, letter)
            ) {
                this.letters[this.currentLetter].className = 'valid-letter';
                this.currentLetter++;

                return;
            }

            switch (key) {
                case 'Backspace':
                    if (this.currentLetter === 0) {
                        return;
                    }

                    this.letters[this.currentLetter - 1].className =
                        'untyped-letter';
                    this.currentLetter--;

                    break;
                case this.letters[this.currentLetter].textContent:
                    this.letters[this.currentLetter].className = 'valid-letter';
                    this.currentLetter++;

                    break;
                default:
                    if (!exceptions.has(key)) {
                        this.letters[this.currentLetter].className =
                            'invalid-letter';
                        this.currentLetter++;

                        return;
                    }
            }
        }
    }

    private checkEndText() {
        if (this.letters!.length === this.currentLetter) {
            this.textService.setTextForTypingLength$(this.letters!.length);
            this.componentsDataService.showOnlyOneComponent('app-result');
        }
    }
}
