import { TemplateRef } from '@angular/core';

export type TemplatesData = {
    [templateName: string]: {
        template: TemplateRef<unknown>;
        isShow: boolean;
    };
};
