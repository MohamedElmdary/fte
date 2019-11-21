import { runTime } from '../src/runtime';
import { parse } from '../src/parse';
import { tokenize } from '../src/tokenize';

it('should be true', () => {
    const code = `
    {@each times:time:i}
        <div>
            {i}
            <span class=dash>
                - {special}
            </span>
            {time}
        </div>
    {/each}
`;

    const ast = parse(tokenize(code));

    runTime(ast, {
        times: [1, 2, 3],
        special: 'almost done?!'
    });

    expect(true).toBe(true);
});
