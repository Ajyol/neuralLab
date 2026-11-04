export class Value {
    data: number;
    grad = 0;
    prev: Value[];
    op: string;
    label: string;

    constructor(data: number, prev: Value[] = [], op = '', label = '') {
        this.data = data;
        this.prev = prev;
        this.op = op;
        this.label = label;
    }

    add(other: Value | number): Value {
        // 1. If `other` is a plain number, wrap it: new Value(other)
        const otherValue = typeof other === 'number' && Number.isFinite(other)
            ? new Value(other)
            : (other as Value);

        // 2. Return a NEW Value whose data is the sum,
        //    whose prev is [this, other], and whose op is '+'
        return new Value(this.data + otherValue.data, [this, otherValue], '+');
    }

    mul(other: Value | number): Value {
        const otherValue = typeof other === 'number' && Number.isFinite(other)
            ? new Value(other)
            : (other as Value);

        return new Value(this.data * otherValue.data, [this, otherValue], '*');
    }
}

export function printGraph(v: Value, depth = 0): string {
    const indentation = '  '.repeat(depth);

    // Build this node's line showing its operation and scalar data
    const opStr = v.op ? ` [${v.op}]` : '';
    const currentLine = `${indentation}Value(data: ${v.data})${opStr}`;

    // If there are no parent nodes, return just the current line
    if (!v.prev || v.prev.length === 0) {
        return currentLine;
    }

    // Recursively process parent nodes and combine all lines
    const prevLines = v.prev.map(p => printGraph(p, depth + 1));
    return [currentLine, ...prevLines].join('\n');
}