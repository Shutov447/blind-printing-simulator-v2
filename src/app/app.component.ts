import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { GearComponent } from './components/gear/gear.component';
import { SOURCE_TEXTS_URL } from './shared/text/source-texts-url.token';
import { TextComponent } from './components/text/text.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        GearComponent,
        TextComponent,
        MatProgressSpinnerModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    constructor(@Inject(SOURCE_TEXTS_URL) readonly sourceTextsUrl: string) {}
}
