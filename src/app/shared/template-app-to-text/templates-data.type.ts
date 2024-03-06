import { TemplateRef } from '@angular/core';

export type TemplatesData = {
    [i: string]: {
        template: TemplateRef<unknown>;
        isShow: boolean;
    };
};
