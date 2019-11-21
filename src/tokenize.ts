import {} from './utils';

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
    At = 'At'
}

type Tokens = Array<{
    type: Types;
    value: string;
}>;

function tokenize(input: string): Tokens {
    let current = -1;
    const tokens: Tokens = [];
    const walk = () => ++current;

    while (current < input.length) {
        break;
    }

    return [];
}

export { Types, tokenize };
