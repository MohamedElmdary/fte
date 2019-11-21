import {
    isChar,
    isDigit,
    isCharOrDigit,
    isOpenAngel,
    isCloseAngel,
    isWhiteSpace,
    isExclamation,
    isDash,
    isQuote,
    isBackSlash,
    isOpenCurl,
    isCloseCurl,
    isAt
} from '../src/utils';

it('should be true if char', () => {
    expect(isChar('c')).toBe(true);
    expect(isChar('0')).toBe(false);
});

it('should be true if digit', () => {
    expect(isDigit('0')).toBe(true);
    expect(isDigit('c')).toBe(false);
});

it('should be true if char || digit', () => {
    expect(isCharOrDigit('c')).toBe(true);
    expect(isCharOrDigit('0')).toBe(true);
    expect(isCharOrDigit('@')).toBe(false);
});

it('should be true if open angel ', () => {
    expect(isOpenAngel('<')).toBe(true);
    expect(isOpenAngel('7')).toBe(false);
});

it('should be true if close angel', () => {
    expect(isCloseAngel('>')).toBe(true);
    expect(isCloseAngel('7')).toBe(false);
});

it('should be true if white space', () => {
    expect(isWhiteSpace(' ')).toBe(true);
    expect(isWhiteSpace('   ')).toBe(true);
    expect(
        isWhiteSpace(`
    `)
    ).toBe(true);
    expect(isWhiteSpace('c')).toBe(false);
});

it('should be true if exclamation mark', () => {
    expect(isExclamation('!')).toBe(true);
    expect(isExclamation('0')).toBe(false);
});

it('should be true if dash', () => {
    expect(isDash('-')).toBe(true);
    expect(isDash('_')).toBe(false);
});

it('should be true if \' || " ', () => {
    expect(isQuote("'")).toBe(true);
    expect(isQuote('"')).toBe(true);
    expect(isQuote('7')).toBe(false);
});

it('should be true if / ', () => {
    expect(isBackSlash('/')).toBe(true);
    expect(isBackSlash('7')).toBe(false);
});

it('should be true if {', () => {
    expect(isOpenCurl('{')).toBe(true);
    expect(isOpenCurl('}')).toBe(false);
});

it('should be true if }', () => {
    expect(isCloseCurl('}')).toBe(true);
    expect(isCloseCurl('7')).toBe(false);
});

it('should be true if @', () => {
    expect(isAt('@')).toBe(true);
    expect(isAt('7')).toBe(false);
});
