### Repartion of exercise 

- exercice 1 : Axel Steinhart
- exercice 2 : Maéva Roncey
- exercice 3 : Charles Rauseo

### Exercise 1: Binary Tree Representation of Content Categories
- **Description**: This module implements a binary tree that organizes content categories hierarchically (e.g., "Technology" → "Programming" → "Python"). Each `CategoryNode` stores `category_id`, `name`, `post_count`, `left`, `right` and `parent`. The tree supports metrics, structural property checks and category navigation.

---

## Complexity Analysis

**Core Algorithms Summary:**
- **AddChild**: Links a child as the left or right subcategory and sets its `parent` pointer ($O(1)$).
- **CalculateHeight**: Recursively computes `1 + Max(height(left), height(right))`; an empty tree has height $-1$ ($O(n)$).
- **CalculateNodeHeight**: Finds the category, then climbs the `parent` pointers to get its depth ($O(n)$).
- **CountNodes / CountLeaves**: A single recursive traversal ($O(n)$).
- **IsBalanced**: Compares the left and right subtree heights at every node ($O(n \log n)$ when balanced, $O(n^2)$ in the worst case, because heights are recomputed).
- **IsFullBinaryTree**: Checks that every node has 0 or 2 children ($O(n)$).
- **IsPerfectBinaryTree**: Checks that $n = 2^{h+1} - 1$ ($O(n)$).
- **IsCompleteBinaryTree**: BFS that rejects any non-null node found after the first `null` ($O(n)$).
- **FindCategory**: Recursive DFS by ID; the tree is not a BST ($O(n)$).
- **FindPathToRoot**: Finds the target, then follows the `parent` pointers up to the root ($O(n)$).
- **LowestCommonAncestor**: Single recursive pass; the LCA is the node where `id1` and `id2` are found in different subtrees ($O(n)$).

**Complexity:**
- **Time Complexity:**
  - **AddChild:** $O(1)$.
  - **Metrics, property checks, search & navigation:** $O(n)$, since each node is visited at most once.
  - **IsBalanced:** $O(n^2)$ in the worst case.
- **Space Complexity:** $O(n)$ for the nodes, plus an $O(h)$ recursion stack ($O(\log n)$ if balanced, $O(n)$ if degenerate).

### Exercise 2: Tree Traversals for Content Processing

- **Description**: This module implements the three traversals from lecture 7 (Process1 = pre-order, Process2 = in-order, Process3 = post-order) and uses them for content processing:
  - In-order: collect names, running total of posts, k-th category.
  - Pre-order: indented export, deep copy, serialization with `#` markers for empty subtrees, so the string can be decoded back.
  - Post-order: total posts, average leaf depth, leaf collection.
  - Analytics: most popular category, category with the most subcategories, distribution by depth.
  - Iterative versions with an explicit stack for all three traversals.

**Complexity:** Every traversal runs in Θ(n) time. The recursive versions need O(h) stack space, and so do the iterative versions, whose explicit stack lives on the heap. `in_order_find_kth` stops early, so it costs O(h + k). Level-order analytics need O(w) queue space.

**Questions:**
1. **Time and space of each traversal:** Θ(n) time and O(h) space for each. This means O(log n) when the tree is balanced and O(n) when it is skewed.
2. **Pre-order or post-order for aggregation:** use post-order when the value of a parent depends on its children (subtree totals, heights). Use pre-order when information flows from the parent down to the children (depth, path, inherited labels).
3. **Iterative versions:** pre-order pops a node and then pushes its right child before its left child. In-order pushes left children until reaching an empty subtree, pops a node, visits it, then moves to its right child. Post-order uses a "last visited" pointer, so a node is processed only after its right subtree.
4. **Category export:** pre-order is the best choice, because every parent is written before its children. The export can then be read back in one pass.
