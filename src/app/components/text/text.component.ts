import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-text',
    standalone: true,
    imports: [],
    templateUrl: './text.component.html',
    styleUrl: './text.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent implements OnChanges {
    @Input() template: TemplateRef<unknown> | undefined;

    @ViewChild('viewContainer', { read: ViewContainerRef, static: true })
    private readonly viewContainer: ViewContainerRef | undefined;

    ngOnChanges({ template }: SimpleChanges) {
        if (template) {
            this.updateView();
        }
    }

    updateView() {
        this.viewContainer?.clear();
        this.template && this.viewContainer?.createEmbeddedView(this.template);
    }
}
