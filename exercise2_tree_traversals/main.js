// Main: demo of Exercise 2 on the subject's category tree
// Run with: node exercise2_tree_traversals/main.js

const { build_sample_tree } = require('./categoryNode');
const { in_order_collect, in_order_accumulate_posts, in_order_find_kth } = require('./inOrder');
const { pre_order_export, pre_order_copy, pre_order_serialize_compact } = require('./preOrder');
const { post_order_total_posts, post_order_average_depth, post_order_collect_leaves } = require('./postOrder');
const {
    find_most_popular_category,
    category_with_most_subcategories,
    categories_with_most_subcategories,
    distribution_by_depth,
} = require('./analytics');
const { pre_order_iterative, in_order_iterative, post_order_iterative } = require('./iterativeTraversals');

const root = build_sample_tree();

console.log("=== Part A: In-order ===");
console.log(in_order_collect(root).join(" -> "));
console.log("Running totals:", in_order_accumulate_posts(root).map((e) => e.running_total).join(", "));
console.log("3rd category in in-order:", in_order_find_kth(3, root).toString());

console.log("\n=== Part B: Pre-order ===");
console.log(pre_order_export(root));
console.log("Serialized:", pre_order_serialize_compact(root));
const copy = pre_order_copy(root);
console.log("Deep copy is a new object:", copy !== root);

console.log("\n=== Part C: Post-order ===");
console.log("Total posts:", post_order_total_posts(root));
console.log("Total posts of Programming:", post_order_total_posts(root.left));
console.log("Average leaf depth:", post_order_average_depth(root));
console.log("Leaves:", post_order_collect_leaves(root).join(", "));

console.log("\n=== Analytics ===");
console.log("distribution_by_depth:", distribution_by_depth(root));
console.log("Most popular:", find_most_popular_category(root).toString());
console.log("Most subcategories:", category_with_most_subcategories(root).name,
    "(ties:", categories_with_most_subcategories(root).join(", ") + ")");

console.log("\n=== Iterative versions ===");
console.log("Pre-order :", pre_order_iterative(root).join(", "));
console.log("In-order  :", in_order_iterative(root).join(", "));
console.log("Post-order:", post_order_iterative(root).join(", "));
