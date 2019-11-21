interface Visitor {
    [key: string]: {
        enter?: (node: any) => void;
        exit?: (node: any) => void;
    };
}

function traverseNode(node: any, visitor: Visitor) {
    const visit = visitor[node.type];
    if (visit) {
        if (visit.enter) {
            visit.enter(node);
        }
    }

    if (node.body) {
        transform(node.body, visitor);
    }
    if (visit) {
        if (visit.exit) {
            visit.exit(node);
        }
    }
}

function transform(ast: any[], visitor: Visitor) {
    ast.forEach(node => {
        traverseNode(node, visitor);
    });
}

export { transform };
