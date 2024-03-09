import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '../../shared/loading/loading.service';
import { TextService } from '../../shared/text/text.service';
import { TextForTypingComponent } from '../text-for-typing/text-for-typing.component';
import { IntroComponent } from '../intro/intro.component';
import { ResultComponent } from '../result/result.component';
import { ComponentsDataService } from '../../shared/components-data/components-data.service';
import { CommonModule } from '@angular/common';
import { ComponentsDataSingletonService } from '../../shared/components-data/components-data-singleton.service';
@Component({
    selector: 'app-text',
    standalone: true,
    templateUrl: './text.component.html',
    styleUrl: './text.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LoadingService, TextService, ComponentsDataService],
    imports: [
        CommonModule,
        TextForTypingComponent,
        IntroComponent,
        ResultComponent,
    ],
})
export class TextComponent {
    constructor(
        readonly componentsDataService: ComponentsDataService,
        readonly componentsDataSingletonService: ComponentsDataSingletonService,
    ) {}
}

// export class TextComponent implements OnInit, OnDestroy {
// private readonly destroy$ = new Subject<void>();
// @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
// private readonly viewContainer: ViewContainerRef | undefined;

// @HostListener('click')
// click() {
//     this.setText();
//     // console.log(1111);
// }

// constructor(
//     private readonly cdr: ChangeDetectorRef,
//     private readonly templateService: TemplateService,
//     private readonly textService: TextService,
//     private readonly loadingService: LoadingService,
// ) {}

// ngOnInit() {
//     this.updateView();
// }

// ngOnDestroy() {
//     this.destroy$.next();
//     this.destroy$.complete();
// }

// updateView() {
//     this.templateService.templatesData$.subscribe((templatesData) => {
//         this.viewContainer?.clear();
//         // this.cdr.markForCheck();

//         for (const key in templatesData) {
//             templatesData[key].isShow &&
//                 this.viewContainer?.createEmbeddedView(
//                     templatesData[key].template,
//                 );
//         }
//         // this.cdr.markForCheck();
//     });
// }

// private setText() {
//     let template: TemplatesToShow | null = null;
//     this.templateService.templatesData$.subscribe((templatesData) => {
//         templatesData && (template = templatesData['']);
//     });
//     this.templateService.setIsSwitchTemplate$(true);
//     this.templateService.isSwitchTemplate$.subscribe((isSwitchTemplate) => {
//         isSwitchTemplate && this.chooseTemplate(template);
//     });
//     this.templateService.setIsSwitchTemplate$(false);
// }

// chooseTemplate(template: TemplatesToShow) {
//     switch (template) {
//         case TemplatesToShow.textForTyping:
//             this.loadingService.load$(true);
//             this.textService
//                 .requestText$('assets/texts_for_typing.json')
//                 .pipe(takeUntil(this.destroy$))
//                 .subscribe({
//                     next: (texts) => {
//                         this.textService.setText$(texts[14].text);
//                         // this.cdr.markForCheck();
//                     },
//                     complete: () => {
//                         this.loadingService.load$(false);
//                         this.templateService.passToShow(
//                             TemplatesToShow.textForTyping,
//                         );
//                         // this.setTemplatesFlags();
//                     },
//                 });

//             break;
//         case TemplatesToShow.result:
//             break;
//         case TemplatesToShow.intro:
//             break;
//     }
// }
// }
