// Iterative versions with an explicit stack (question 3)
// The stack is an array on the heap, so very deep trees do not overflow the call stack.

function pre_order_iterative(node) {
    const result = [];
    const stack = node !== null ? [node] : [];
    while (stack.length > 0) {
        const current = stack.pop();
        result.push(current.name);
        if (current.right !== null) stack.push(current.right);   // pushed first, processed after left
        if (current.left !== null) stack.push(current.left);
    }
    return result;
}

// "Go deep, turn left, when possible" (lecture 7)
function in_order_iterative(node) {
    const result = [];
    const stack = [];
    let current = node;
    while (stack.length > 0 || current !== null) {
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        result.push(current.name);
        current = current.right;
    }
    return result;
}

// A node is processed only after its right subtree ("last visited" pointer)
function post_order_iterative(node) {
    const result = [];
    const stack = [];
    let current = node;
    let last_visited = null;
    while (stack.length > 0 || current !== null) {
        if (current !== null) {
            stack.push(current);
            current = current.left;
        } else {
            const top = stack[stack.length - 1];
            if (top.right !== null && last_visited !== top.right) {
                current = top.right;
            } else {
                result.push(top.name);
                last_visited = stack.pop();
            }
        }
    }
    return result;
}

function post_order_total_posts_iterative(node) {
    let total = 0;
    const stack = node !== null ? [node] : [];
    while (stack.length > 0) {
        const current = stack.pop();
        total += current.post_count;
        if (current.left !== null) stack.push(current.left);
        if (current.right !== null) stack.push(current.right);
    }
    return total;
}

module.exports = {
    pre_order_iterative,
    in_order_iterative,
    post_order_iterative,
    post_order_total_posts_iterative,
};
