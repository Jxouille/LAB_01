### Repartion of exercise 

- exercice 1 : Axel Steinhart 
- exercice 2 : Maeva Roncey
- exercice 3 : Charles Rauseo

### Exercise 3: Engagement-Based Priority Queue (Trending Now)
- **Description**: This module implements a priority queue using a sorted singly linked list to manage content by engagement metrics. It maintains posts in descending order of engagement scores (computed via likes, comments, and shares), supporting core operations such as EnqueuePost, DequeueMaxPost, UpdateScore, RefreshAll, DecayOlderThan, and dual-priority routing (DualEnqueue, DualDequeue).

---

## Complexity Analysis & Questions

**Core Algorithms Summary:**
- **EnqueuePost**: Inserts a new post into its correct sorted position based on engagement_score in descending order (O(n)).
- **DequeueMaxPost**: Removes and returns the highest-priority post located at the head of the list (O(1)).
- **UpdateScore**: Unlinks a post by ID, recalculates its engagement score using weights ("likes * 1.0 + comments * 2.0 + shares * 3.0"), and re-inserts it (O(n)).
- **RefreshAll / DecayOlderThan**: Applies metric reduction multipliers based on time thresholds and re-sorts the entire collection.
- **Dual Queues (DualEnqueue / DualDequeue)**: Separates viral posts ("score > 100") from normal posts with probabilistic weighted pulling (70% bias toward viral content).

**Complexity:**
- **Time Complexity:** 
  - **Enqueue / Update / Decay/Refresh:** O(n) in the worst case due to linear linked list traversal.
  - **Dequeue Max / Peek Max:** O(1) via direct head access.
- **Space Complexity:** O(n) to store active posts within the linked list structure.

**Questions:**
1. **Sorted vs. Unsorted Linked List Enqueue:** A sorted linked list takes O(n) for enqueue and O(1) for dequeue-max. An unsorted list allows O(1) enqueue (appending at head/tail), but forces dequeue-max to scan the full list (O(n)).
2. **Worst-case of update_score & Optimization:** Worst-case is O(n) for search/removal plus O(n) for re-insertion. Can be optimized using a secondary "HashMap<String, Node>" for O(1) node lookups.
3. **Practicality for millions of posts:** Inefficient for large-scale data under heavy write loads due to linear traversal overhead. Real systems rely on binary heaps or skip lists (O(log n)).
4. **Extra memory overhead:** Zero extra memory compared to standard linked lists.
5. **Alternative structure:** Binary Heaps or Skip Lists (used in Redis sorted sets) provide optimal O(log n) performance.
