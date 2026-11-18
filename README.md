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

