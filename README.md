### Repartion of exercise 

- exercice 1 : Axel Steinhart 
- exercice 2 : Maeva Roncey
- exercice 3 : Charles Rauseo


### Exercise 1: Content Feed Navigation with Doubly Linked List (Story Highlights)
- **Description**: This module implements a browsable content feed using a doubly linked list to support efficient bidirectional navigation. It manages a chronological sequence of stories (`StoryNode`) with `head`, `tail`, and `current` pointers, supporting core operations such as `add_story`, `remove_story`, `move_forward`, `move_backward`, `jump_to`, `insert_after`, `display_around_current`, as well as engagement tracking (`track_view`, `most_viewed`, and `reorder_by_views`).

---

## Complexity Analysis & Questions

**Core Algorithms Summary:**
- **add_story**: Appends a new story node to the end of the feed (`tail`) while maintaining chronological order ($O(1)$).
- **move_forward / move_backward**: Advances or rewinds the `current` pointer to the adjacent story using `next` or `prev` pointers ($O(1)$).
- **jump_to**: Searches for a specific story by `story_id` from the head and updates the `current` pointer ($O(n)$).
- **insert_after**: Traverses the feed to locate a target `story_id` and links a new story node immediately after it ($O(n)$ search, $O(1)$ pointer update).
- **remove_story**: Finds a story by `story_id` and unlinks it from the doubly linked list while safely updating `head`, `tail`, and `current` pointers ($O(n)$ search, $O(1)$ unlinking).
- **display_around_current**: Traverses up to $k$ nodes backward and $k$ nodes forward from `current` to display the surrounding feed context ($O(k)$).
- **track_view**: Increments the `views` counter of the currently active story ($O(1)$).
- **most_viewed**: Performs a single linear traversal from `head` to `tail` to return the story with the highest view count ($O(n)$).
- **reorder_by_views**: Reorganizes the feed in descending order of views so the most popular stories appear first ($O(n^2)$ using selection/extraction sort, or $O(n \log n)$ using merge sort).

**Complexity:**
- **Time Complexity:** 
  - **Append (`add_story`) / Step Navigation (`move_forward`, `move_backward`) / `track_view`:** $O(1)$ via direct `tail`, `current`, `next`, and `prev` pointer manipulation.
  - **Context Display (`display_around_current`):** $O(k)$ where $k$ is the window radius around `current`.
  - **Search (`jump_to`) / `insert_after` / `remove_story` (by ID) / `most_viewed`:** $O(n)$ in the worst case due to linear list traversal.
  - **Sorting (`reorder_by_views`):** $O(n^2)$ with repeated max-extraction (or $O(n \log n)$ with list merge sort).
- **Space Complexity:** $O(n)$ to store the $n$ story nodes and their bidirectional pointers in memory.

**Questions:**
1. **Forward/Backward Navigation (Singly vs. Doubly Linked List):** Forward navigation (`move_forward`) is $O(1)$ in both structures via the `next` pointer. However, backward navigation (`move_backward`) is $O(1)$ in a doubly linked list thanks to the `prev` pointer, whereas it takes $O(n)$ in a singly linked list because finding the predecessor requires traversing from `head`.
2. **Removing a node given only a direct pointer to it:** In a doubly linked list, it takes $O(1)$ time because the node holds direct references to both `prev` and `next`, allowing immediate relinking (`node.prev.next = node.next` and `node.next.prev = node.prev`). In a singly linked list, it requires $O(n)$ to find the previous node starting from `head`.
3. **Extra memory overhead per node:** Each node in a doubly linked list requires one additional pointer (`prev`) compared to a singly linked list, which represents $8\text{ bytes}$ per node on a 64-bit architecture ($O(1)$ extra space per node, $O(n)$ total overhead).
4. **Scenarios justifying the memory overhead:** Bidirectional navigation justifies the extra pointer whenever users or algorithms frequently move backward and forward or need $O(1)$ node deletion—such as social media story carousels, web browser history (Back/Forward), media playlists, Undo/Redo stacks, and LRU (Least Recently Used) caches.

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
