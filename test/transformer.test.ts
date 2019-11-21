import { transform } from '../src/transformer';
import { parse, ParseTypes } from '../src/parse';
import { tokenize } from '../src/tokenize';

it('should pass', () => {
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

    const parsedCode = parse(tokenize(code));
    let exp = 0;
    let otg = 0;
    let str = 0;
    let iEx = 0;

    transform(parsedCode, {
        [ParseTypes.Expression]: {
            enter(node) {
                exp++;
            }
        },
        [ParseTypes.OpenTag]: {
            enter(node) {
                otg++;
            }
        },
        [ParseTypes.IdentifierExpression]: {
            enter(node) {
                iEx++;
            }
        },
        [ParseTypes.StringLiteral]: {
            enter(node) {
                str++;
            }
        }
    });

    expect(exp).toBe(1);
    expect(otg).toBe(2);
    expect(str).toBe(1);
    expect(iEx).toBe(2);
});
