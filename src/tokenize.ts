import {
    isWhiteSpace,
    isOpenAngel,
    isCloseAngel,
    isOpenCurl,
    isCloseCurl,
    isBackSlash,
    isExclamation,
    isDash,
    isAt,
    isEqualOperator,
    isCharOrDigit,
    isQuote,
    isColon
} from './utils';

enum Types {
    openAngel = 'openAngel',
    closeAngel = 'closeAngel',
    String = 'String',
    eqalOperator = 'eqalOperator',
    openCurl = 'openCurl',
    closeCurl = 'closeCurl',
    backSlash = 'backSlash',
    dash = 'dash',
    exclamation = 'exclamation',
    At = 'At',
    Colon = 'Colon'
}

type Tokens = Array<{
    type: Types;
    value: string;
}>;

function tokenize(input: string): Tokens {
    let current = 0;
    const tokens: Tokens = [];
    const walk = () => current++;

    while (current < input.length) {
        let c = input[walk()];

        if (isWhiteSpace(c)) {
            continue;
        }

        if (isOpenAngel(c)) {
            tokens.push({
                type: Types.openAngel,
                value: c
            });
            continue;
        }

        if (isCloseAngel(c)) {
            tokens.push({
                type: Types.closeAngel,
                value: c
            });
            continue;
        }

        if (isOpenCurl(c)) {
            tokens.push({
                type: Types.openCurl,
                value: c
            });
            continue;
        }

        if (isCloseCurl(c)) {
            tokens.push({
                type: Types.closeCurl,
                value: c
            });
            continue;
        }

        if (isBackSlash(c)) {
            tokens.push({
                type: Types.backSlash,
                value: c
            });
            continue;
        }

        if (isExclamation(c)) {
            tokens.push({
                type: Types.exclamation,
                value: c
            });
            continue;
        }

        if (isDash(c)) {
            tokens.push({
                type: Types.dash,
                value: c
            });
            continue;
        }

        if (isAt(c)) {
            tokens.push({
                type: Types.At,
                value: c
            });
            continue;
        }

        if (isColon(c)) {
            tokens.push({
                type: Types.Colon,
                value: c
            });
            continue;
        }

        if (isEqualOperator(c)) {
            tokens.push({
                type: Types.eqalOperator,
                value: c
            });
            continue;
        }

        if (isCharOrDigit(c)) {
            let value = c;
            while ((c = input[walk()]) && isCharOrDigit(c)) {
                value += c;
            }
            tokens.push({
                type: Types.String,
                value
            });
            current--;
            continue;
        }

        if (isQuote(c)) {
            let value = c;
            while (!isQuote((c = input[walk()]))) {
                value += c;
            }
            value += c;
            tokens.push({
                type: Types.String,
                value
            });
            continue;
        }

        throw new Error(`${c} invalid token(${current}, ${current + 1})`);
    }

    return tokens;
}

export { Types, tokenize };
