import { InjectionToken } from '@angular/core';

export const SOURCE_TEXTS_URL = new InjectionToken<string>('Url for texts', {
    factory: () => 'https://ilibrary.ru',
});
