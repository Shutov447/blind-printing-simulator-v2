import { InjectionToken } from '@angular/core';

export const TEXTS_URL = new InjectionToken<string>('Url for texts', {
    factory: () => 'https://ilibrary.ru',
});
