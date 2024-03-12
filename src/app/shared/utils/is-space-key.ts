export function isSpaceKey(key: string, letter: string) {
    return (
        (letter.charCodeAt(0) === 160 ? true : false) &&
        key.charCodeAt(0) === 32
    );
}
