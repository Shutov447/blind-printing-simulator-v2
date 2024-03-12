export function isAliasKey(
    aliases: string[],
    key: string,
    letter: string,
): boolean {
    return aliases.includes(key) && aliases.includes(letter);
}
