// Traversal-based analytics

// Category with the highest own post_count (first one in pre-order on ties)
function find_most_popular_category(node) {
    if (node === null) return null;
    let best = node;
    for (const child of [node.left, node.right]) {
        const candidate = find_most_popular_category(child);
        if (candidate !== null && candidate.post_count > best.post_count) best = candidate;
    }
    return best;
}

function children_count(node) {
    return (node.left !== null ? 1 : 0) + (node.right !== null ? 1 : 0);
}

// Category with the most direct children (first one in pre-order on ties)
function category_with_most_subcategories(node) {
    if (node === null) return null;
    let best = node;
    for (const child of [node.left, node.right]) {
        const candidate = category_with_most_subcategories(child);
        if (candidate !== null && children_count(candidate) > children_count(best)) best = candidate;
    }
    return best;
}

// All the categories tied for the maximum number of direct children
function categories_with_most_subcategories(node) {
    const nodes = [];
    const stack = node !== null ? [node] : [];
    while (stack.length > 0) {
        const current = stack.pop();
        nodes.push(current);
        if (current.right !== null) stack.push(current.right);
        if (current.left !== null) stack.push(current.left);
    }
    if (nodes.length === 0) return [];
    const maximum = Math.max(...nodes.map(children_count));
    return nodes.filter((n) => children_count(n) === maximum).map((n) => n.name);
}

// { depth: number of categories } with a level-order traversal (queue)
function distribution_by_depth(node) {
    const distribution = {};
    if (node === null) return distribution;
    const queue = [{ current: node, depth: 0 }];
    let head = 0;                                  // index of the front of the queue (O(1) dequeue)
    while (head < queue.length) {
        const { current, depth } = queue[head++];
        distribution[depth] = (distribution[depth] || 0) + 1;
        if (current.left !== null) queue.push({ current: current.left, depth: depth + 1 });
        if (current.right !== null) queue.push({ current: current.right, depth: depth + 1 });
    }
    return distribution;
}

module.exports = {
    find_most_popular_category,
    category_with_most_subcategories,
    categories_with_most_subcategories,
    distribution_by_depth,
    children_count,
};
