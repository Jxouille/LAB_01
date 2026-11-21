// Part A: In-order traversal (Left -> Root -> Right)

function in_order_collect(node, result = []) {
    if (node !== null) {
        in_order_collect(node.left, result);
        result.push(node.name);
        in_order_collect(node.right, result);
    }
    return result;
}

// Returns [{ name, post_count, running_total }] in in-order sequence
function in_order_accumulate_posts(node) {
    const result = [];
    let running_total = 0;

    function visit(current) {
        if (current === null) return;
        visit(current.left);
        running_total += current.post_count;
        result.push({ name: current.name, post_count: current.post_count, running_total });
        visit(current.right);
    }

    visit(node);
    return result;
}

// k-th category in in-order (1-indexed), null if k is out of range. Stops early.
function in_order_find_kth(k, node) {
    if (!Number.isInteger(k) || k < 1) return null;
    let counter = 0;

    function visit(current) {
        if (current === null) return null;
        const found = visit(current.left);
        if (found !== null) return found;
        counter++;
        if (counter === k) return current;
        return visit(current.right);
    }

    return visit(node);
}

module.exports = { in_order_collect, in_order_accumulate_posts, in_order_find_kth };
