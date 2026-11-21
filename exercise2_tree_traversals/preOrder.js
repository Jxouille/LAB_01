// Part B: Pre-order traversal (Root -> Left -> Right)

const { CategoryNode } = require('./categoryNode');

// Indented text export, one line per category
function pre_order_export(node) {
    const lines = [];

    function visit(current, indent) {
        if (current === null) return;
        lines.push("  ".repeat(indent) + `${current.name}(${current.post_count})`);
        visit(current.left, indent + 1);
        visit(current.right, indent + 1);
    }

    visit(node, 0);
    return lines.join("\n");
}

// Deep copy: the parent is created before its children
function pre_order_copy(node, parent = null) {
    if (node === null) return null;
    const copy = new CategoryNode(node.category_id, node.name, node.post_count);
    copy.parent = parent;
    copy.left = pre_order_copy(node.left, copy);
    copy.right = pre_order_copy(node.right, copy);
    return copy;
}

// "Technology(150)|Programming(85)|..." with "#" for empty subtrees (reversible)
function pre_order_serialize(node) {
    const tokens = [];

    function visit(current) {
        if (current === null) {
            tokens.push("#");
            return;
        }
        tokens.push(`${current.name}(${current.post_count})`);
        visit(current.left);
        visit(current.right);
    }

    visit(node);
    return tokens.join("|");
}

// Exact format of the subject (no "#" markers, so it cannot be decoded back)
function pre_order_serialize_compact(node) {
    const tokens = [];

    function visit(current) {
        if (current === null) return;
        tokens.push(`${current.name}(${current.post_count})`);
        visit(current.left);
        visit(current.right);
    }

    visit(node);
    return tokens.join("|");
}

// Inverse of pre_order_serialize. Ids are regenerated in pre-order.
function pre_order_deserialize(data) {
    const tokens = data ? data.split("|") : ["#"];
    let index = 0;
    let next_id = 1;

    function build(parent) {
        const token = tokens[index++];
        if (token === undefined || token === "#") return null;
        const open = token.lastIndexOf("(");          // a name may contain "("
        const name = token.slice(0, open);
        const count = Number(token.slice(open + 1, -1));
        const current = new CategoryNode(next_id++, name, count);
        current.parent = parent;
        current.left = build(current);
        current.right = build(current);
        return current;
    }

    return build(null);
}

module.exports = {
    pre_order_export,
    pre_order_copy,
    pre_order_serialize,
    pre_order_serialize_compact,
    pre_order_deserialize,
};
