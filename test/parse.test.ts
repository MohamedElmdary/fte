import { parse } from '../src/parse';
import { tokenize } from '../src/tokenize';

it('should be true', () => {
    const code = `
        {@each times:   time:i}
    <p>
    <div foo=bar fx="bz" disabled/>
</p>
        {/each}
    `;
    console.log(JSON.stringify(parse(tokenize(code)), undefined, 2));

    expect(true).toBe(true);
});
