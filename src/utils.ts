/* helpers for lexical analysis */
const isChar = (c: string) => /[a-zA-Z]/.test(c);
const isDigit = (c: string) => /\d/.test(c);
const isCharOrDigit = (c: string) => isChar(c) || isDigit(c);
const isOpenAngel = (c: string) => c === '<';
const isCloseAngel = (c: string) => c === '>';
const isWhiteSpace = (c: string) => /(\s|\t|\n)/.test(c);
const isExclamation = (c: string) => c === '!';
const isDash = (c: string) => c === '-';
const isQuote = (c: string) => c === "'" || c === '"';
const isBackSlash = (c: string) => c === '/';
const isOpenCurl = (c: string) => c === '{';
const isCloseCurl = (c: string) => c === '}';
const isAt = (c: string) => c === '@';

export {
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
};
