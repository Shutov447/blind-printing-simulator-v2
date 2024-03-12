import { IText } from '../text/text.interface';

export function sliceText(text: IText['text']): string[] {
    return text.split('');
}
