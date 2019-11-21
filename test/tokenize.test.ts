import { Types, tokenize } from '../src/tokenize';

it('should return empty array', () => {
    const code = `     `;
    expect(tokenize(code)).toEqual([]);
});

it('should tokenize open angel', () => {
    const code = `<`;
    expect(tokenize(code)).toEqual([{ type: Types.openAngel, value: '<' }]);
});

it('should tokenize close angel', () => {
    const code = `>`;
    expect(tokenize(code)).toEqual([{ type: Types.closeAngel, value: '>' }]);
});

it('should tokenize backSlash', () => {
    const code = `/`;
    expect(tokenize(code)).toEqual([{ type: Types.backSlash, value: '/' }]);
});

it('should tokenize open curl', () => {
    const code = `{`;
    expect(tokenize(code)).toEqual([{ type: Types.openCurl, value: '{' }]);
});

it('should tokenize close curl', () => {
    const code = `}`;
    expect(tokenize(code)).toEqual([{ type: Types.closeCurl, value: '}' }]);
});

it('should tokenize equal operator', () => {
    const code = `=`;
    expect(tokenize(code)).toEqual([{ type: Types.eqalOperator, value: '=' }]);
});

it('should tokenize dash', () => {
    const code = `-`;
    expect(tokenize(code)).toEqual([{ type: Types.dash, value: '-' }]);
});

it('should tokenize colon', () => {
    const code = `:`;
    expect(tokenize(code)).toEqual([{ type: Types.Colon, value: ':' }]);
});

it('should tokenize exclamation', () => {
    const code = `!`;
    expect(tokenize(code)).toEqual([{ type: Types.exclamation, value: '!' }]);
});

it('should tokenize @At', () => {
    const code = `  @  `;
    expect(tokenize(code)).toEqual([{ type: Types.At, value: '@' }]);
});

it('should tokenize single string', () => {
    const code = ` div`;
    expect(tokenize(code)).toEqual([{ type: Types.String, value: 'div' }]);
});

it('should tokenize double string', () => {
    const code = `   hello world  `;
    expect(tokenize(code)).toEqual([
        { type: Types.String, value: 'hello' },
        { type: Types.String, value: 'world' }
    ]);
});

it('should tokenize string with quotes', () => {
    const code = `    "hello world"`;
    expect(tokenize(code)).toEqual([
        { type: Types.String, value: '"hello world"' }
    ]);
});

it('should tokenize full code', () => {
    const code = `
        <div>
            <input x=y foo="bar" disabled/>
        </div>
    `;
    expect(tokenize(code)).toEqual([
        { type: Types.openAngel, value: '<' },
        { type: Types.String, value: 'div' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.openAngel, value: '<' },
        { type: Types.String, value: 'input' },
        { type: Types.String, value: 'x' },
        { type: Types.eqalOperator, value: '=' },
        { type: Types.String, value: 'y' },
        { type: Types.String, value: 'foo' },
        { type: Types.eqalOperator, value: '=' },
        { type: Types.String, value: '"bar"' },
        { type: Types.String, value: 'disabled' },
        { type: Types.backSlash, value: '/' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.openAngel, value: '<' },
        { type: Types.backSlash, value: '/' },
        { type: Types.String, value: 'div' },
        { type: Types.closeAngel, value: '>' }
    ]);
});

it('should tokenize @each with code inside', () => {
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
    expect(tokenize(code)).toEqual([
        { type: Types.openCurl, value: '{' },
        { type: Types.At, value: '@' },
        { type: Types.String, value: 'each' },
        { type: Types.String, value: 'times' },
        { type: Types.Colon, value: ':' },
        { type: Types.String, value: 'time' },
        { type: Types.Colon, value: ':' },
        { type: Types.String, value: 'i' },
        { type: Types.closeCurl, value: '}' },
        { type: Types.openAngel, value: '<' },
        { type: Types.String, value: 'div' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.openCurl, value: '{' },
        { type: Types.String, value: 'i' },
        { type: Types.closeCurl, value: '}' },
        { type: Types.openAngel, value: '<' },
        { type: Types.String, value: 'span' },
        { type: Types.String, value: 'class' },
        { type: Types.eqalOperator, value: '=' },
        { type: Types.String, value: 'dash' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.dash, value: '-' },
        { type: Types.openAngel, value: '<' },
        { type: Types.backSlash, value: '/' },
        { type: Types.String, value: 'span' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.openCurl, value: '{' },
        { type: Types.String, value: 'time' },
        { type: Types.closeCurl, value: '}' },
        { type: Types.openAngel, value: '<' },
        { type: Types.backSlash, value: '/' },
        { type: Types.String, value: 'div' },
        { type: Types.closeAngel, value: '>' },
        { type: Types.openCurl, value: '{' },
        { type: Types.backSlash, value: '/' },
        { type: Types.String, value: 'each' },
        { type: Types.closeCurl, value: '}' }
    ]);
});
