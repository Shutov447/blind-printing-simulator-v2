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
import { Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TemplateService } from './shared/template-app-to-text/template.service';
import { LoadingService } from './shared/loading/loading.service';
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
    providers: [TextService, TemplateService, LoadingService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy, OnInit {
    private readonly destroy$ = new Subject<void>();

    private canSwitchTemplate = true;

    readonly title = 'blind-printing-simulator-v2';

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
        readonly textService: TextService,
        private readonly templateService: TemplateService,
        readonly loadingService: LoadingService,
    ) {}

    ngOnInit() {
        this.passTemplates();
        this.setTemplatesFlags();
    }

    ngOnDestroy() {
        this.fullUnsubscribe();
    }

    // onClick() {
    //     this.getStarted();
    // }

    // private getStarted() {
    // условие на активность состояния шаблонов и в зависимости от них по клику мы переходим на нужный нам шаблон
    // (условие на шаблон с текстом), а где в другом компоненте условние на шаблон с результатами
    // if (this.canSwitchTemplate) {
    //     this.loadingService.load$(true);
    //     this.textService
    //         .requestText$('assets/texts_for_typing.json')
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe({
    //             next: (texts) => {
    //                 this.text = texts[14].text;
    //                 // this.cdr.markForCheck();
    //             },
    //             complete: () => {
    //                 this.loadingService.load$(false);
    //                 this.templateService.passToShow(
    //                     TemplatesToShow.textForTyping,
    //                 );
    //                 // this.setTemplatesFlags();
    //             },
    //         });
    // }
    // this.canSwitchTemplate = false;
    // }

    private passTemplates() {
        this.templateService.setTemplatesData$({
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
        this.loadingService.unsub();
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setTemplatesFlags() {
        this.templateService.templatesData$.subscribe((templatesData) => {
            this.isStartTypingText = templatesData['textForTyping'].isShow;
            this.isStartIntro = templatesData['intro'].isShow;
            // this.cdr.markForCheck();
        });
    }
}
