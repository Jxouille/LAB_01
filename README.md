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

**Files** (folder `exercise2_tree_traversals/`, JavaScript, Node.js 18+, no dependencies):
- `categoryNode.js`: `CategoryNode` class (`set_left`, `set_right`, `is_leaf`) and `build_sample_tree()`.
- `inOrder.js` (Part A): `in_order_collect`, `in_order_accumulate_posts`, `in_order_find_kth`.
- `preOrder.js` (Part B): `pre_order_export`, `pre_order_copy`, `pre_order_serialize_compact` (subject format), `pre_order_serialize` / `pre_order_deserialize` (reversible, `#` markers).
- `postOrder.js` (Part C): `post_order_total_posts`, `post_order_average_depth`, `post_order_collect_leaves`.
- `analytics.js`: `find_most_popular_category`, `category_with_most_subcategories` / `categories_with_most_subcategories` (ties), `distribution_by_depth`.
- `iterativeTraversals.js`: stack-based pre-order, in-order, post-order and total posts.
- `main.js`: demo on the subject's tree; `test.js`: 15 edge-case tests (`node:test`).

**Run:**
```bash
node exercise2_tree_traversals/main.js
node --test exercise2_tree_traversals/test.js   # give the file path: the folder alone is not found by Node 22+
```

**Complexity:** Every traversal runs in Θ(n) time. The recursive versions need O(h) stack space, and so do the iterative versions, whose explicit stack lives on the heap. `in_order_find_kth` stops early, so it costs O(h + k). Level-order analytics need O(w) queue space.

**Questions:**
1. **Time and space of each traversal:** Θ(n) time and O(h) space for each. This means O(log n) when the tree is balanced and O(n) when it is skewed.
2. **Pre-order or post-order for aggregation:** use post-order when the value of a parent depends on its children (subtree totals, heights). Use pre-order when information flows from the parent down to the children (depth, path, inherited labels).
3. **Iterative versions:** pre-order pops a node and then pushes its right child before its left child. In-order pushes left children until reaching an empty subtree, pops a node, visits it, then moves to its right child. Post-order uses a "last visited" pointer, so a node is processed only after its right subtree.
4. **Category export:** pre-order is the best choice, because every parent is written before its children. The export can then be read back in one pass.

### Exercise 3: Generalized Trees (N-ary Trees) and Representations

- **Description**: This module implements a generalized (N-ary) tree, where a category can have any number of subcategories. Each `GeneralizedCategoryNode` stores `category_id`, `name`, `post_count`, a `children` list and `parent`. The module covers:
  - Conversions: binary → generalized (left and right both become children), generalized → binary with the "first child, next sibling" (FCNS) representation, and the inverse FCNS → generalized.
  - Traversals: pre-order, post-order, level-order (BFS with a queue) and fan-out.
  - Metrics: height, number of nodes, number of leaves, branching factor.

---

## Complexity Analysis

**Core Algorithms Summary:**
- **BinaryToGeneralized**: Copies each node and adds its left and right children (if any) to the `children` list, setting `parent` ($O(n)$).
- **GeneralizedToBinary**: `left` ← first child, then the other children are chained through `right` with a loop; `parent` pointers are set ($O(n)$).
- **FCNSToGeneralized**: Inverse of the previous one: walks the `left` → `right` → `right`… chain to rebuild each `children` list ($O(n)$).
- **PreOrderGeneralized / PostOrderGeneralized**: Recursive DFS writing into a single shared result list, so no list is copied ($O(n)$).
- **LevelOrderGeneralized**: BFS with a queue, enqueuing all children of each dequeued node ($O(n)$).
- **CalculateFanOut**: Maximum `children.Size()` over all nodes ($O(n)$).
- **CalculateHeightGeneralized**: `1 + max(height(child))`, a leaf has height 0 and an empty tree $-1$ ($O(n)$).
- **CountNodesGeneralized / CountLeavesGeneralized**: A single recursive traversal ($O(n)$).
- **CalculateBranchingFactor**: `GetNonLeavesCount` returns the number of non-leaf nodes and the total number of children in one pass; the result is their real division ($O(n)$).

**Complexity:**
- **Time Complexity:** $O(n)$ for every function, since each node is visited once and each child reference ($n - 1$ in total) is followed once.
- **Space Complexity:** $O(n)$ for the nodes, plus an $O(h)$ recursion stack, or $O(w)$ queue space for level-order ($w$ = maximum width).

**Note on the example of the subject:** the subject gives a branching factor of $(3 + 2 + 2 + 3) / 4 = 2.5$, but Python also has 2 children (Django, Flask). With 5 non-leaf nodes the correct value is $12 / 5 = 2.4$, which is what our function returns. Other results on the example tree: fan-out 3, 13 nodes, 8 leaves, height 3.

**Questions:**
1. **Advantages and disadvantages:** the generalized tree matches the real hierarchy and gives direct access to all subcategories, but each node holds a variable-size list. The FCNS binary tree has a fixed size per node (2 pointers), but reaching the k-th child means walking the sibling chain, and the structure is less intuitive to read.
2. **Space complexity:** both are $O(n)$. With dynamic lists, the total number of child references is exactly $n - 1$. It becomes $O(n \cdot b)$ only if each node reserves a fixed array of $b$ slots. FCNS uses exactly $2n$ pointers.
3. **Traversal complexity:** $O(n)$ time in both representations. In the N-ary tree the recursion depth is the real height $h$. In FCNS, going to a sibling is also a recursive step, so the depth can reach $O(n)$ (a root with 1000 children: depth 1 in N-ary, 1000 in FCNS).
4. **Choice for millions of categories:** the generalized representation for the application logic (direct access to subcategories, stack depth = real height), with iterative traversals to avoid stack overflow and a hash map `id → node` for $O(1)$ lookup. FCNS remains useful for storage, because every record has a fixed size.
5. **FCNS transformation:** `left` points to the first child and `right` to the next sibling, so the children of a node form a linked list. Each node is created once and each child is read once: $O(n)$ time, $O(n)$ space for the new tree. `FCNSToGeneralized(GeneralizedToBinary(T))` gives back `T`.

