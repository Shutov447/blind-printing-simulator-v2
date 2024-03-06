import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { TemplateService } from '../../shared/template-app-to-text/template.service';
@Component({
    selector: 'app-text',
    standalone: true,
    imports: [],
    templateUrl: './text.component.html',
    styleUrl: './text.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnInit {
    @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
    private readonly viewContainer: ViewContainerRef | undefined;

    constructor(
        private readonly cdr: ChangeDetectorRef,
        private readonly templateService: TemplateService,
    ) {}

    ngOnInit() {
        this.updateView();
    }

    updateView() {
        this.templateService.templatesData$.subscribe((templatesData) => {
            this.viewContainer?.clear();
            this.cdr.markForCheck();

            for (const key in templatesData) {
                templatesData[key].isShow &&
                    this.viewContainer?.createEmbeddedView(
                        templatesData[key].template,
                    );
            }
            this.cdr.markForCheck();
        });
    }
}
