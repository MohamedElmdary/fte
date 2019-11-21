import { Types, tokenize } from '../src/tokenize';

it('should return empty array', () => {
    const code = `     `;
    expect(tokenize(code)).toEqual([]);
});

it.skip('should tokenize open angel', () => {
    const code = `<`;
    expect(tokenize(code)).toEqual([{ type: Types.openAngel, value: '<' }]);
});

it.skip('should tokenize close angel', () => {
    const code = `>`;
    expect(tokenize(code)).toEqual([{ type: Types.closeAngel, value: '>' }]);
});

it.skip('should tokenize backSlash', () => {
    const code = `/`;
    expect(tokenize(code)).toEqual([{ type: Types.backSlash, value: '/' }]);
});

it.skip('should tokenize open curl', () => {
    const code = `{`;
    expect(tokenize(code)).toEqual([{ type: Types.openCurl, value: '{' }]);
});

it.skip('should tokenize close curl', () => {
    const code = `}`;
    expect(tokenize(code)).toEqual([{ type: Types.closeAngel, value: '}' }]);
});

it.skip('should tokenize equal operator', () => {
    const code = `=`;
    expect(tokenize(code)).toEqual([{ type: Types.eqalOperator, value: '=' }]);
});

it.skip('should tokenize string', () => {
    const code = ` div`;
    expect(tokenize(code)).toEqual([{ type: Types.String, value: 'div' }]);
});

it.skip('should tokenize string', () => {
    const code = `   hello world  `;
    expect(tokenize(code)).toEqual([
        { type: Types.String, value: 'hello' },
        { type: Types.String, value: 'world' }
    ]);
});

it.skip('should tokenize dash', () => {
    const code = `-`;
    expect(tokenize(code)).toEqual([{ type: Types.dash, value: '-' }]);
});

it.skip('should tokenize exclamation', () => {
    const code = `!`;
    expect(tokenize(code)).toEqual([{ type: Types.exclamation, value: '!' }]);
});

it.skip('should tokenize @At', () => {
    const code = `  @  `;
    expect(tokenize(code)).toEqual([{ type: Types.At, value: '@' }]);
});

it.skip('should tokenize full code', () => {
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
