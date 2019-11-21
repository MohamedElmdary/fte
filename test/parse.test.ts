import { parse } from '../src/parse';
import { tokenize } from '../src/tokenize';

it('should be true', () => {
    const code = `
        {@each times:   time:i}
            <div>
                {i}
                <span class=dash>
                    -
                </span>
                {time}
            </div>
        {/each}
    `;

    expect(parse(tokenize(code))).toEqual([
        {
            type: 'Expression',
            kind: 'each',
            environment: 'times',
            identifier: 'time',
            indexIdentifier: 'i',
            body: [
                {
                    type: 'OpenTag',
                    value: 'div',
                    attributes: [],
                    body: [
                        {
                            type: 'IdentifierExpression',
                            value: 'i'
                        },
                        {
                            type: 'OpenTag',
                            value: 'span',
                            attributes: [
                                {
                                    type: 'Attribute',
                                    name: 'class',
                                    value: 'dash'
                                }
                            ],
                            body: [
                                {
                                    type: 'StringLiteral',
                                    value: '-'
                                }
                            ]
                        },
                        {
                            type: 'IdentifierExpression',
                            value: 'time'
                        }
                    ]
                }
            ]
        }
    ]);
});
