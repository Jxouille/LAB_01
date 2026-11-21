// Part C: Post-order traversal (Left -> Right -> Root)

function post_order_total_posts(node) {
    if (node === null) return 0;
    const left_total = post_order_total_posts(node.left);
    const right_total = post_order_total_posts(node.right);
    return left_total + right_total + node.post_count;
}

// Average depth (in edges) of the leaf categories, 0 for an empty tree
function post_order_average_depth(node) {
    // returns { sum, count } for the leaves of the subtree
    function visit(current, depth) {
        if (current === null) return { sum: 0, count: 0 };
        if (current.is_leaf()) return { sum: depth, count: 1 };
        const left = visit(current.left, depth + 1);
        const right = visit(current.right, depth + 1);
        return { sum: left.sum + right.sum, count: left.count + right.count };
    }

    const { sum, count } = visit(node, 0);
    return count === 0 ? 0 : sum / count;
}

function post_order_collect_leaves(node, result = []) {
    if (node !== null) {
        post_order_collect_leaves(node.left, result);
        post_order_collect_leaves(node.right, result);
        if (node.is_leaf()) result.push(node.name);
    }
    return result;
}

module.exports = { post_order_total_posts, post_order_average_depth, post_order_collect_leaves };
