import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GearComponent } from './components/gear/gear.component';
import { TEXTS_URL } from './shared/texts-url/texts-url.token';
import { TextComponent } from './components/text/text.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, GearComponent, TextComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly title = 'blind-printing-simulator-v2';

    canClick = true;
    isStart = false;

    onClick() {
        this.getStarted();
    }

    getStarted() {
        this.canClick && (this.isStart = !this.isStart);
        this.canClick = false;
    }

    constructor(@Inject(TEXTS_URL) readonly textsUrl: string) {}
}
