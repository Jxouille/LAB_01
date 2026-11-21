// Edge-case test set for Exercise 2
// Run with: node --test exercise2_tree_traversals/test.js      (Node.js 18+, no npm install needed)

const test = require('node:test');
const assert = require('node:assert/strict');

const { CategoryNode, build_sample_tree } = require('./categoryNode');
const { in_order_collect, in_order_accumulate_posts, in_order_find_kth } = require('./inOrder');
const {
    pre_order_export, pre_order_copy, pre_order_serialize,
    pre_order_serialize_compact, pre_order_deserialize,
} = require('./preOrder');
const { post_order_total_posts, post_order_average_depth, post_order_collect_leaves } = require('./postOrder');
const {
    find_most_popular_category, category_with_most_subcategories,
    categories_with_most_subcategories, distribution_by_depth,
} = require('./analytics');
const {
    pre_order_iterative, in_order_iterative, post_order_iterative,
    post_order_total_posts_iterative,
} = require('./iterativeTraversals');

const IN_ORDER = ["Django", "Python", "Flask", "Programming", "Java",
    "Technology", "UI/UX", "Design", "Graphics"];

function left_chain(length) {
    const root = new CategoryNode(1, "N1", 1);
    let current = root;
    for (let i = 2; i <= length; i++) current = current.set_left(new CategoryNode(i, `N${i}`, 1));
    return root;
}

// ---------------------------------------------------------------- Part A
test("in-order on the sample tree (recursive and iterative)", () => {
    const root = build_sample_tree();
    assert.deepEqual(in_order_collect(root), IN_ORDER);
    assert.deepEqual(in_order_iterative(root), IN_ORDER);
});

test("running total of posts", () => {
    const totals = in_order_accumulate_posts(build_sample_tree());
    assert.deepEqual(totals[0], { name: "Django", post_count: 18, running_total: 18 });
    assert.equal(totals[totals.length - 1].running_total, 462);
    assert.deepEqual(in_order_accumulate_posts(null), []);
});

test("k-th category: first, middle, last, out of range", () => {
    const root = build_sample_tree();
    assert.equal(in_order_find_kth(1, root).name, "Django");
    assert.equal(in_order_find_kth(6, root).name, "Technology");
    assert.equal(in_order_find_kth(9, root).name, "Graphics");
    assert.equal(in_order_find_kth(0, root), null);
    assert.equal(in_order_find_kth(10, root), null);
    assert.equal(in_order_find_kth(-3, root), null);
    assert.equal(in_order_find_kth(1, null), null);
});

// ---------------------------------------------------------------- Part B
test("pre-order export with indentation", () => {
    const lines = pre_order_export(build_sample_tree()).split("\n");
    assert.equal(lines[0], "Technology(150)");
    assert.equal(lines[3], "      Django(18)");
    assert.equal(lines.length, 9);
    assert.equal(pre_order_export(null), "");
});

test("deep copy is independent from the original", () => {
    const root = build_sample_tree();
    const copy = pre_order_copy(root);
    assert.notEqual(copy, root);
    assert.equal(pre_order_serialize(copy), pre_order_serialize(root));
    copy.left.name = "Changed";
    assert.equal(root.left.name, "Programming");
    assert.equal(copy.left.parent, copy);
    assert.equal(pre_order_copy(null), null);
});

test("serialization: subject format and round trip", () => {
    const root = build_sample_tree();
    assert.equal(pre_order_serialize_compact(root),
        "Technology(150)|Programming(85)|Python(42)|Django(18)|Flask(12)|Java(30)|Design(65)|UI/UX(38)|Graphics(22)");
    const data = pre_order_serialize(root);
    assert.equal(pre_order_serialize(pre_order_deserialize(data)), data);
    assert.equal(pre_order_deserialize(pre_order_serialize(null)), null);
});

test("serialization of a name containing parentheses", () => {
    const node = new CategoryNode(1, "C (lang)", 3);
    assert.equal(pre_order_deserialize(pre_order_serialize(node)).name, "C (lang)");
});

// ---------------------------------------------------------------- Part C
test("total posts of each branch", () => {
    const root = build_sample_tree();
    assert.equal(post_order_total_posts(root), 462);
    assert.equal(post_order_total_posts(root.left), 187);         // Programming
    assert.equal(post_order_total_posts(root.left.left), 72);     // Python
    assert.equal(post_order_total_posts(root.right), 125);        // Design
    assert.equal(post_order_total_posts(null), 0);
});

test("leaves and average leaf depth", () => {
    const root = build_sample_tree();
    assert.deepEqual(post_order_collect_leaves(root), ["Django", "Flask", "Java", "UI/UX", "Graphics"]);
    assert.equal(post_order_average_depth(root), 12 / 5);
    assert.equal(post_order_average_depth(null), 0);
    assert.equal(post_order_average_depth(new CategoryNode(1, "Solo")), 0);  // root is a leaf
});

test("iterative pre-order and post-order", () => {
    const root = build_sample_tree();
    assert.deepEqual(pre_order_iterative(root).slice(0, 4), ["Technology", "Programming", "Python", "Django"]);
    assert.deepEqual(post_order_iterative(root),
        ["Django", "Flask", "Python", "Java", "Programming", "UI/UX", "Graphics", "Design", "Technology"]);
    assert.deepEqual(pre_order_iterative(null), []);
    assert.deepEqual(post_order_iterative(null), []);
});

// ---------------------------------------------------------------- Analytics
test("distribution by depth", () => {
    assert.deepEqual(distribution_by_depth(build_sample_tree()), { 0: 1, 1: 2, 2: 4, 3: 2 });
    assert.deepEqual(distribution_by_depth(null), {});
});

test("most popular category", () => {
    assert.equal(find_most_popular_category(build_sample_tree()).name, "Technology");
    assert.equal(find_most_popular_category(null), null);
});

test("most subcategories with ties", () => {
    const root = build_sample_tree();
    // 4 categories have 2 children: the strict ">" keeps the first one in pre-order
    assert.equal(category_with_most_subcategories(root).name, "Technology");
    assert.deepEqual(categories_with_most_subcategories(root), ["Technology", "Programming", "Python", "Design"]);
    assert.equal(category_with_most_subcategories(null), null);
    assert.deepEqual(categories_with_most_subcategories(null), []);
});

test("zero and negative post counts", () => {
    const node = new CategoryNode(1, "Z", 0);
    node.set_left(new CategoryNode(2, "Neg", -5));
    assert.equal(post_order_total_posts(node), -5);
    assert.equal(find_most_popular_category(node).name, "Z");
});

// ---------------------------------------------------------------- Deep trees
test("iterative versions survive a 100,000-level tree, recursive one overflows", () => {
    const chain = left_chain(100_000);
    assert.equal(post_order_total_posts_iterative(chain), 100_000);
    assert.equal(in_order_iterative(chain).length, 100_000);
    assert.equal(post_order_iterative(chain).length, 100_000);
    assert.throws(() => post_order_total_posts(chain), RangeError);  // "Maximum call stack size exceeded"
});
