### Repartion of exercise 
- exercice 1 : Axel Steinhart
- exercise 2 : Maeva Roncey
- exercice 3 : Charles Rauseo
- exercice 4 : Axel Steinhart

### Exercise 1: Friend Request Timeline
* **Descritpion**: This exercise involves specific characteristics used to determine whether a message is calm, aggressive, urgent, and/or spam, based on a given set of rules.


### Exercise 3: Friend Recommendation System
* **Description**: This module implements a collaborative filtering friend recommendation system based on user interest profiles. It computes the cosine similarity between users' interest vectors, extracts top-K friend recommendations by excluding existing friends and self-matches, and suggests new high-rated interests from the most similar users.


### Exercise 4: Mutual Followers Matrix
* **Description**: This module implements a directed social graph using a 2D boolean adjacency matrix. It provides constant-time lookup functions to follow, unfollow, and check relationships, as well as functions to retrieve lists of followers and followings, detect mutual connections, and compute a user's influence score.
---

## Complexity Analysis Summary

### Exercice 1

**Complexity:**
- **Time Complexity:** $\mathcal{O}(n)$ — Single pass over the $n$-character string to compute counters and detect runs.
- **Space Complexity:** $\mathcal{O}(1)$ — Only a few scalar variables are used.

**Questions:**
1. **Comparisons:** $\mathcal{O}(n)$ (a constant number of condition checks per character).
2. **Single pass:** Yes, all checks (counts, ratio, spam) are done in 1 loop.
3. **Unicode support:** Time stays $\mathcal{O}(n)$ with a higher constant factor (multi-byte UTF-8 decoding and property lookups). Space stays $\mathcal{O}(1)$.

**Edge Cases:**
- `""` (empty string): Returns `("CALM", False)` to avoid division by zero.
- `"???!!!!"` (no letters): Caps ratio set to 0, classified only via punctuation.
- Repetitions: Spam triggers only if a character repeats $\ge 4$ times.

### Exercise 3

#### 1. Pairwise Similarity Calculation
* **Time Complexity**: O(U^2 * I), where U is the total number of users and I is the total number of interests. Calculating the similarity for all U*(U-1)/2 unique user pairs requires iterating across all I interest scores per pair.

#### 2. Sparse Matrix Optimization Strategy
* **Inverted Index**: Maps each interest to users who rated it, allowing pairwise calculations only for users who share at least one interest and skipping zero-overlap pairs.
* **Sparse Formats (COO / CSR)**: Stores only non-zero ratings (N_nz) to iterate strictly over active user interests rather than the full I dimension.
* **Precomputed Vector Norms**: Calculates Euclidean norms ||u|| once per user prior to comparison loops, avoiding redundant square root operations during pairwise calculations.

#### 3. Space Complexity
* **Full Matrix**: O(U * I) space required to store the full 2D grid, regardless of matrix sparsity.
* **Sparse Representation**: O(N_nz + U) space required, storing only non-zero entries and row pointers/indices, drastically reducing memory overhead for sparse datasets.

### Exercise 4

**Complexity:**
- **Time Complexity:** $\mathcal{O}(1)$ for basic operations like `Follow`, `Unfollow`, and `Is_following`. $\mathcal{O}(N)$ for `Get_followers` and `Get_following` where $N$ is the number of users. $\mathcal{O}(N^2)$ for detecting all mutual follows.
- **Space Complexity:** $\mathcal{O}(N^2)$ — A 2D boolean matrix of size $N \times N$ is required to store all possible connections.

**Questions:**
1. **Time complexity of lookups:** $\mathcal{O}(N)$ because we must loop over a full row or a full column of size $N$.
2. **Space complexity:** $\mathcal{O}(N^2)$ for the $N \times N$ matrix.
3. **Impractical network size:** It becomes highly inefficient around 50,000 to 100,000 users. The $\mathcal{O}(N^2)$ memory scaling means allocating billions of cells for empty connections, which is a massive waste of RAM since real social networks are very sparse.
