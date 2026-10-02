### Exercise 3: Friend Recommendation System
* **Description**: This module implements a collaborative filtering friend recommendation system based on user interest profiles. It computes the cosine similarity between users' interest vectors, extracts top-K friend recommendations by excluding existing friends and self-matches, and suggests new high-rated interests from the most similar users.

---

## Complexity Analysis Summary

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
