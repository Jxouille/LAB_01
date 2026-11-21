### Repartion of exercise 

- exercice 1 : Axel Steinhart
- exercice 2 : Maéva Roncey
- exercice 3 : Charles Rauseo

### Exercise 1: Binary Tree Representation of Content Categories
- **Description**: This module implements a binary tree that organizes social media content categories hierarchically (e.g., "Technology" → "Programming" → "Python"). Each category is a `CategoryNode` (`category_id`, `name`, `post_count`, `left`, `right`, `parent`), and children are linked with `AddChild`, which also sets the `parent` reference. The module supports tree metrics (`CalculateHeight`, `CalculateNodeHeight`, `CountNodes`, `CountLeaves`, `IsBalanced`), structural property checks (`IsFullBinaryTree`, `IsPerfectBinaryTree`, `IsCompleteBinaryTree`), and category navigation (`FindCategory`, `FindPathToRoot`, `LowestCommonAncestor`).

---

## Complexity Analysis & Questions

**Core Algorithms Summary:**
- **AddChild**: Attaches a child as the left or right subcategory and sets its `parent` pointer ($O(1)$).
- **CalculateHeight**: Recursively returns `1 + Max(height(left), height(right))`. An empty tree has height $-1$ and a leaf has height $0$ ($O(n)$).
- **CalculateNodeHeight**: Locates the category with `FindCategory`, then follows the `parent` pointers to count its distance from the root, e.g. "Java" → 2 ($O(n)$ search + $O(h)$ climb).
- **CountNodes / CountLeaves**: A single recursive traversal that counts every node, or only the nodes with no children ($O(n)$).
- **IsBalanced**: Top-down recursion that compares `CalculateHeight(left)` and `CalculateHeight(right)` at every node and checks $|h_{left} - h_{right}| \le 1$, then recurses on both subtrees. Heights are recomputed at each level ($O(n \log n)$ on a balanced tree, $O(n^2)$ in the worst case). A bottom-up version that returns the height, or a $-1$ sentinel on imbalance, would bring this down to $O(n)$.
- **IsFullBinaryTree**: Recursively checks that every node has either 0 or 2 children ($O(n)$).
- **IsPerfectBinaryTree**: Uses the property that a perfect tree of height $h$ contains exactly $2^{h+1} - 1$ nodes, and compares it with `CountNodes` ($O(n)$, two traversals).
- **IsCompleteBinaryTree**: Level-order (BFS) traversal with a queue. Once a `null` child is dequeued, a flag is raised, and any non-null node found afterwards means the tree is not complete ($O(n)$ time, $O(w)$ queue space, where $w$ is the maximum width).
- **FindCategory**: Recursive DFS (root, then left, then right). The tree is not ordered by ID (it is not a BST), so every node may need to be visited ($O(n)$).
- **FindPathToRoot**: Finds the target node, then climbs the `parent` pointers and collects category names up to the root ($O(n)$ search + $O(h)$ climb).
- **LowestCommonAncestor**: Single recursive pass. A node is returned if it matches `id1` or `id2`. If both subtrees return a non-null result, the current node is the LCA; otherwise the non-null result is propagated upward ($O(n)$).

**Complexity:**
- **Time Complexity:**
  - **Linking (`AddChild`):** $O(1)$.
  - **Metrics (`CalculateHeight`, `CountNodes`, `CountLeaves`):** $O(n)$, since each node is visited once.
  - **Balance check (`IsBalanced`):** $O(n \log n)$ on a balanced tree, $O(n^2)$ in the worst case, because heights are recomputed.
  - **Property checks (`IsFullBinaryTree`, `IsPerfectBinaryTree`, `IsCompleteBinaryTree`):** $O(n)$.
  - **Search & navigation (`FindCategory`, `CalculateNodeHeight`, `FindPathToRoot`, `LowestCommonAncestor`):** $O(n)$ in the worst case, because the tree is not ordered by key.
- **Space Complexity:** $O(n)$ to store the nodes (3 references per node: `left`, `right`, `parent`). The recursion stack uses $O(h)$, which is $O(\log n)$ for a balanced tree and $O(n)$ for a degenerate (list-like) tree. `IsCompleteBinaryTree` additionally uses an $O(w)$ queue.

**Questions:**
1. **Time complexity of calculating tree height (with proof):** $\Theta(n)$. The recurrence is $T(0) = d$ and $T(n) = T(k) + T(n-k-1) + c$, where $k$ is the size of the left subtree. By induction, $T(n) = (c+d)\,n + d$: substituting gives $(c+d)k + d + (c+d)(n-k-1) + d + c = (c+d)n + d$. This holds for any split $k$, so $T(n) = O(n)$. The bound is also tight ($\Omega(n)$), because any unvisited node could be the root of a deeper subtree, so every node must be examined.
2. **Maximum height of a perfectly balanced binary tree with $n$ nodes:** $h = \lfloor \log_2 n \rfloor$. A perfect tree of height $h$ contains $n = 2^{h+1} - 1$ nodes (the same property used in `IsPerfectBinaryTree`), so $h = \log_2(n+1) - 1$. For the looser AVL-style balance (difference ≤ 1), the height remains logarithmic: $h < 1.44 \log_2 n$.
3. **Why balance matters with millions of categories:** Navigation operations (`FindPathToRoot`, `CalculateNodeHeight`, breadcrumbs) and the recursion depth of every recursive function cost $O(h)$. With $10^6$ categories, a balanced tree has $h \approx 20$, while a degenerate tree can reach $h \approx 10^6$. That turns logarithmic operations into linear ones and risks stack overflow (Python's default recursion limit is about 1000). Real systems therefore rely on self-balancing structures (AVL, Red-Black trees) or wide N-ary trees / B-trees to keep the height logarithmic.

---

### Exercise 2: Tree Traversals for Content Analytics (JavaScript)
- **Description**: This module (folder `exercise2_tree_traversals/`, Node.js 18+, no dependencies) reuses the `CategoryNode` structure and implements the three depth-first traversals on the subject's category tree, plus traversal-based analytics and iterative versions.
  - `categoryNode.js`: `CategoryNode` class (`set_left`, `set_right`, `is_leaf`) and `build_sample_tree()`.
  - `inOrder.js` (Part A): `in_order_collect`, `in_order_accumulate_posts` (running total), `in_order_find_kth` (stops early).
  - `preOrder.js` (Part B): `pre_order_export` (indented text), `pre_order_copy` (deep copy), `pre_order_serialize_compact` (subject format), `pre_order_serialize` / `pre_order_deserialize` (reversible format with `#` markers).
  - `postOrder.js` (Part C): `post_order_total_posts`, `post_order_average_depth` (leaf depth), `post_order_collect_leaves`.
  - `analytics.js`: `find_most_popular_category`, `category_with_most_subcategories` / `categories_with_most_subcategories` (ties), `distribution_by_depth` (level-order with a queue).
  - `iterativeTraversals.js`: stack-based pre-order, in-order, post-order and total posts.
  - `main.js`: demo, `test.js`: 15 edge-case tests (`node:test`).

**Run:**
```bash
node exercise2_tree_traversals/main.js
node --test exercise2_tree_traversals/test.js   # give the file path: the folder alone is not found by Node 22+
```

**Complexity:** every traversal visits each node once: $O(n)$ time. Recursive versions use $O(h)$ call-stack space; `distribution_by_depth` uses an $O(w)$ queue; `in_order_find_kth` stops as soon as the $k$-th node is reached.

**Why iterative versions:** the recursion depth equals the tree height. On a degenerate tree of 100,000 levels the recursive `post_order_total_posts` throws `RangeError: Maximum call stack size exceeded`, while the explicit-stack versions (heap-allocated array) succeed — this is checked in `test.js`.
