import { Tokens, Types } from './tokenize';
import { WSAEHOSTDOWN } from 'constants';

enum ParseTypes {
    OpenTag = 'OpenTag',
    CloseTag = 'CloseTag',
    SelfClosingTag = 'SelfClosingTag',
    Attribute = 'Attribute',
    Expression = 'Expression',
    CloseExpression = 'CloseExpression',
    IdentifierExpression = 'IdentifierExpression',
    Identifier = 'Identifier',
    StringLiteral = 'StringLiteral'
}

function parenthesize(tokens: Tokens): Tokens[] {
    const sht = () =>
        tokens.shift() as {
            type: Types;
            value: string;
        };

    const result: Tokens[] = [];

    while (tokens.length) {
        let token = sht();

        const parts: Tokens = [];
        if (token.type === Types.openAngel) {
            do {
                parts.push(token);
            } while ((token = sht()).type !== Types.closeAngel);

            parts.push(token);
            result.push(parts);
            continue;
        }

        if (token.type === Types.openCurl) {
            do {
                parts.push(token);
            } while ((token = sht()).type !== Types.closeCurl);
            parts.push(token);
            result.push(parts);
            continue;
        }

        do {
            parts.push(token);
        } while (
            (token = sht()) &&
            token.type !== Types.openAngel &&
            token.type !== Types.openCurl
        );
        if (token) {
            tokens.unshift(token);
        }
        result.push(parts);
        continue;
    }

    return result;
}

function grouper(tokens: Tokens[]) {
    const sht = () => tokens.shift() as Tokens;

    const result: any[] = [];
    while (tokens.length) {
        let token = sht();
        let shtT = () => token.shift() as { type: Types; value: string };
        let firstToken = shtT();

        if (
            firstToken.type !== Types.openAngel &&
            firstToken.type !== Types.openCurl
        ) {
            result.push({
                type: ParseTypes.StringLiteral,
                value: token
                    .map(a => a.value)
                    .reduce((a, b) => a + ' ' + b, firstToken.value)
            });
        }

        if (firstToken.type === Types.openAngel) {
            let secondToken = shtT();
            if (secondToken.type === Types.backSlash) {
                result.push({
                    type: ParseTypes.CloseTag,
                    value: shtT().value
                });
            } else {
                let attributes = [];
                let tempToken = shtT();

                while (
                    tempToken.type !== Types.backSlash &&
                    tempToken.type !== Types.closeAngel
                ) {
                    let mayBeEqal = shtT();
                    attributes.push({
                        type: ParseTypes.Attribute,
                        name: tempToken.value,
                        value:
                            mayBeEqal.type === Types.eqalOperator
                                ? shtT().value
                                : undefined
                    });
                    if (mayBeEqal.type === Types.eqalOperator) {
                        tempToken = shtT();
                    } else {
                        tempToken = mayBeEqal;
                    }
                }

                result.push({
                    type:
                        tempToken.type === Types.backSlash
                            ? ParseTypes.SelfClosingTag
                            : ParseTypes.OpenTag,
                    value: secondToken.value,
                    attributes
                });
            }
        }

        if (firstToken.type === Types.openCurl) {
            let secondToken = shtT();

            if (secondToken.type === Types.At) {
                const expression: any = {
                    type: ParseTypes.Expression,
                    kind: shtT().value,
                    environment: shtT().value,
                    identifier: undefined,
                    indexIdentifier: undefined
                };
                let tempToken = shtT();
                if (tempToken.type !== Types.Colon) {
                    throw new Error(`${tempToken.value} unexpected token`);
                }
                expression.identifier = shtT().value;
                tempToken = shtT();
                if (tempToken.type === Types.Colon) {
                    expression.indexIdentifier = shtT().value;
                }
                tempToken = shtT();
                if (tempToken.type !== Types.closeCurl) {
                    throw new Error(`${tempToken.value} unexpected token`);
                }
                result.push(expression);
                continue;
            }

            if (secondToken.type === Types.backSlash) {
                let secondToken = shtT();

                let tempToken = shtT();
                if (tempToken.type !== Types.closeCurl) {
                    throw new Error(`${tempToken.value} unexpected token`);
                }
                result.push({
                    type: ParseTypes.CloseExpression,
                    kind: secondToken.value
                });
                continue;
            }

            let tempToken = shtT();
            if (tempToken.type !== Types.closeCurl) {
                throw new Error(`${tempToken.value} unexpected token`);
            }

            result.push({
                type: ParseTypes.IdentifierExpression,
                value: secondToken.value
            });
        }
    }

    return result;
}

function isFlatGroup(group: any): boolean {
    return (
        group.type === ParseTypes.IdentifierExpression ||
        group.type === ParseTypes.StringLiteral ||
        group.type === ParseTypes.SelfClosingTag
    );
}

function parseTag(group: any, groups: any[]) {
    const sht = () => groups.shift();
    const tag: any = {
        ...group,
        body: []
    };
    const body = [];

    while ((group = sht()).type !== ParseTypes.CloseTag) {
        if (group.type === ParseTypes.Expression) {
            body.push(parseExpression(group, groups));
            continue;
        }

        if (group.type === ParseTypes.OpenTag) {
            body.push(parseTag(group, groups));
            continue;
        }

        if (isFlatGroup(group)) {
            body.push(group);
            continue;
        }
    }
    tag.body = body;
    return tag;
}

function parseExpression(group: any, groups: any[]) {
    const sht = () => groups.shift();
    const expression: any = {
        ...group,
        body: []
    };
    const body = [];

    while ((group = sht()).type !== ParseTypes.CloseExpression) {
        if (group.type === ParseTypes.Expression) {
            body.push(parseExpression(group, groups));
            continue;
        }

        if (group.type === ParseTypes.OpenTag) {
            body.push(parseTag(group, groups));
            continue;
        }

        if (isFlatGroup(group)) {
            body.push(group);
            continue;
        }
    }

    expression.body = body;
    return expression;
}

function parser(groups: any[]) {
    const sht = () => groups.shift();
    const result: any[] = [];

    while (groups.length) {
        let group = sht() as { type: ParseTypes; [key: string]: string };

        if (group.type === ParseTypes.Expression) {
            result.push(parseExpression(group, groups));
            continue;
        }

        if (group.type === ParseTypes.OpenTag) {
            result.push(parseTag(group, groups));
            continue;
        }

        if (isFlatGroup(group)) {
            result.push(group);
            continue;
        }
    }

    return result;
}

const parse = (tokens: Tokens) => parser(grouper(parenthesize(tokens)));

export { ParseTypes, parse };
