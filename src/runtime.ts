import { transform } from './transformer';
import { ParseTypes } from './parse';

function runTime(ast: any, environment: { [key: string]: any }) {
    transform(ast, {
        [ParseTypes.Expression]: {
            enter(node) {
                if (node.kind === 'each') {
                    const arr = environment[node.environment];
                    if (!arr || !Array.isArray(arr)) {
                        throw new Error(`${arr} cannot be array`);
                    }

                    const body = JSON.stringify(node.body);
                    const newBody: any[] = [];

                    const itemName = node.identifier;
                    const indexName = node.indexIdentifier;

                    arr.forEach((item, index) => {
                        let temp = JSON.parse(body);
                        transform(temp, {
                            [ParseTypes.IdentifierExpression]: {
                                enter(node) {
                                    if (node.value === indexName) {
                                        node.value = index;
                                        node.type = ParseTypes.StringLiteral;
                                    }

                                    if (node.value === itemName) {
                                        node.value = item;
                                        node.type = ParseTypes.StringLiteral;
                                    }
                                }
                            }
                        });
                        newBody.push(temp);
                    });
                    node.body = [].concat.apply([], newBody);
                } else {
                    throw new Error(`${node.kind} unexpected identifier`);
                }
            }
        },

        [ParseTypes.IdentifierExpression]: {
            enter(node) {
                if (!environment[node.value]) {
                    throw new Error(`${node.value} cannot be an identifier`);
                }

                node.type = ParseTypes.StringLiteral;
                node.value = environment[node.value];
            }
        }
    });
}

export { runTime };
