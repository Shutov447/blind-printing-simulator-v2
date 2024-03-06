import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
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
import { TemplateService } from './shared/template-app-to-text/template.service';
import { TemplatesToShow } from './shared/template-app-to-text/template-to-show.enum';
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
    providers: [TextService, TemplateService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
    private readonly destroy$ = new Subject<void>();
    private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

    private canClick = true;

    readonly title = 'blind-printing-simulator-v2';
    readonly isLoading$ = this._isLoading$.asObservable();

    text = '';
    isStartTypingText = false;
    isStartIntro = true;

    @ViewChild('textForTyping', {
        read: TemplateRef,
        static: true,
    })
    textForTyping: TemplateRef<unknown> | undefined;
    @ViewChild('intro', {
        read: TemplateRef,
        static: true,
    })
    intro: TemplateRef<unknown> | undefined;

    constructor(
        @Inject(SOURCE_TEXTS_URL) readonly sourceTextsUrl: string,
        private readonly cdr: ChangeDetectorRef,
        private readonly textService: TextService,
        readonly templateService: TemplateService,
    ) {}

    ngOnInit() {
        this.passTemplate();
        this.setTemplatesFlags();
    }

    ngOnDestroy() {
        this.fullUnsubscribe();
    }

    onClick() {
        this.getStarted();
    }

    private getStarted() {
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
                        this.templateService.passToShow(
                            TemplatesToShow.textForTyping,
                        );
                        this.setTemplatesFlags();
                    },
                });
        }

        this.canClick = false;
    }

    private passTemplate() {
        this.templateService.getTemplatesData({
            textForTyping: {
                template: this.textForTyping!,
                isShow: this.isStartTypingText,
            },
            intro: {
                template: this.intro!,
                isShow: this.isStartIntro,
            },
        });
    }

    fullUnsubscribe() {
        this.isLoading$.pipe(takeUntil(this.destroy$));
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setTemplatesFlags() {
        this.templateService.templatesData$.subscribe((templatesData) => {
            this.isStartTypingText = templatesData['textForTyping'].isShow;
            this.isStartIntro = templatesData['intro'].isShow;
            this.cdr.markForCheck();
        });
    }
}
