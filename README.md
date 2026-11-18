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

