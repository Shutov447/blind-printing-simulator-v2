import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TemplatesData } from './templates-data.type';
import { TemplatesToShow } from './template-to-show.enum';

@Injectable({
    providedIn: 'root',
})
export class TemplateService {
    private readonly _templatesData$ = new BehaviorSubject<TemplatesData>({});
    private readonly _isSwitchTemplate$ = new BehaviorSubject<boolean>(false);

    readonly templatesData$ = this._templatesData$.asObservable();
    readonly isSwitchTemplate$ = this._isSwitchTemplate$.asObservable();

    setTemplatesData$(templatesData: TemplatesData) {
        this._templatesData$.next(templatesData);
    }

    setIsSwitchTemplate$(isSwitchTemplate: boolean) {
        this._isSwitchTemplate$.next(isSwitchTemplate);
    }

    passToShow(templateToShow: TemplatesToShow) {
        let newTemplatesData: TemplatesData = {};

        this.templatesData$.subscribe((templatesData) => {
            newTemplatesData = templatesData;
        });
        this.showOnlyOne(newTemplatesData, templateToShow);
    }

    private showOnlyOne(obj: TemplatesData, templateName: TemplatesToShow) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (key !== templateName) {
                    obj[key].isShow = false;
                } else {
                    obj[key].isShow = true;
                }
            }
        }

        this.setTemplatesData$(obj);
    }
}
