import { IText } from '../text/text.interface';

let previousTextId = -1;

function findId(texts: IText[]) {
    return Math.floor(Math.random() * texts.length);
}

export function textRandomizer(texts: IText[]): IText['text'] {
    let textId = findId(texts);

    while (textId == previousTextId) {
        textId = findId(texts);
    }

    previousTextId = textId;

    return texts[textId].text;
}
