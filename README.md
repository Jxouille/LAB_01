# LAB_01

## Member and exercise

Maéva Roncey : exercise 1 and exercise 3
Axel Steinhart : exercise 2 and exercise 4
Charles Rauseo : exercise 3 and exercise 6

---

## Brief Description of Solutions

### Exercise 1: Integer Mirror (Digit Reversal)
* **Description** : This function takes a non-negative integer and returns a new number formed by reversing its decimal digits. The algorithm uses only basic mathematical operations (modulo 10 and integer division) without any string conversion, efficiently handling leading zeros and edge cases.

### Exercise 2: Balanced Symbol Checker

* **Description** : This function takes a string as input and returns whether all symbols are properly balanced and closed. It parses the entire text, mapping each opening symbol to its corresponding closing symbol. For each opening character encountered, it pushes it onto a stack. When a closing symbol is found, it checks whether it matches the most recent opening symbol from the stack; if not, it returns False. At the end, if the stack is not empty, it returns False (meaning an opening symbol was never closed). Otherwise, it returns True

### Exercise 3: Merge Intervals
* **Description** : This function merges all overlapping intervals in a collection. It sorts the intervals by start time and iterates through them, expanding the end range of the last merged interval when an overlap is found, or appending a new interval otherwise.
 
### Exercise 4: Polynomial Evaluation (Horner's Method)
* **Description** : This function evaluates a polynomial for a given real value $x$ using an array of coefficients. Rather than using the naive approach (which calculates each power of $x$ separately), it implements **Horner's method** to optimize computation and minimize the number of operations.

### Exercise 5 : Array Rotation

* **Description** : This module provides three distinct algorithmic approaches to rotate an array
to the right by k positions in-place, illustrating different time and space complexity tradeoffs:

- rotate_temp_array: Uses an auxiliary buffer to achieve O(n) time with O(n) extra space.
- rotate_one_by_one: Shifts elements step-by-step using O(1) auxiliary space, running in O(n * k) time.
- rotate_reverse: Optimally performs the rotation in O(n) time and O(1) space via a three-step reversal algorithm.
All implementations handle edge cases (empty or single-element lists) and normalize k using modular arithmetic.

### Exercise 6: First Unique Character
* **Description** : This function finds the index of the first non-repeating character in a string using a two-pass approach with a hash map to track character frequencies.


---

## Complexity Analysis Summary

### Exercise 1
* **Time Complexity** : $O(\log_{10} n)$ or $O(d)$ where $d$ is the number of digits in integer $n$. The loop runs as many times as there are digits in the number.
* **Space Complexity** : $O(1)$ because only a few temporary variables are used, regardless of the size of $n$.

### Exercise 2
* **Time Complexity** :  O(n) because the list is traversed only one time. So if we add a comparaison character that change nothing to the complexity.

### Exercise 3
* **Comparison Operations** : Requires $n \log_2(n)$ comparisons for sorting, plus $n - 1$ comparisons during the merging loop, totaling approximately $n \log_2(n) + n - 1$ operations.
* **Time Complexity** : $O(n \log n)$ because sorting dominates the linear $O(n)$ merging phase.
* **Space Complexity** : $O(n)$ to store the merged output list.

### Exercise 4 
* **Time Complexity** : $O(n)$ where $n$ is the degree of the polynomial (or the size of the coefficient array minus one). The algorithm performs exactly $n$ multiplications and additions in a single linear loop, which is much more efficient than the naive $O(n^2)$ approach.
* **Space Complexity** : $O(1)$ because the calculation is performed in constant memory without any extra data structures.

### Exercise 5

#### temporary array method 
* **Time Complexity** :  O(n) 
* **Space Complexity** : O(n) 

#### rotate one by one method
* **Time Complexity** :  O(n x (k(mod n))) 
* **Space Complexity** : O(1)

#### reverse segment method
* **Time Complexity** :  O(n) 
* **Space Complexity** : O(1)

### Exercise 6
* **Passes** : Exactly 2 linear passes through the string.
* **Optimal Data Structure** : Hash Map or fixed-size Array for $O(1)$ lookup times.
* **Time Complexity** : $O(n)$ where $n$ is the length of the string.
* **Space Complexity** : $O(1)$ auxiliary space, as the character set (map) is bounded by a fixed alphabet size.
