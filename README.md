# LAB_01

## Member and exercise

Maéva Roncey : exercise 1 and exercise 3
Axel Steinhart : exercise 2 and exercise 4
Charles Rauseo : exercise 3 and exercise 6

---

## Brief Description of Solutions

### Exercise 1: Integer Mirror (Digit Reversal)
* **Description** : This function takes a non-negative integer and returns a new number formed by reversing its decimal digits. The algorithm uses only basic mathematical operations (modulo 10 and integer division) without any string conversion, efficiently handling leading zeros and edge cases.

### Exercise 4: Polynomial Evaluation (Horner's Method)
* **Description** : This function evaluates a polynomial for a given real value $x$ using an array of coefficients. Rather than using the naive approach (which calculates each power of $x$ separately), it implements **Horner's method** to optimize computation and minimize the number of operations.

---

## Complexity Analysis Summary

### Exercise 1
* **Time Complexity** : $O(\log_{10} n)$ or $O(d)$ where $d$ is the number of digits in integer $n$. The loop runs as many times as there are digits in the number.
* **Space Complexity** : $O(1)$ because only a few temporary variables are used, regardless of the size of $n$.

### Exercise 4
* **Time Complexity** : $O(n)$ where $n$ is the degree of the polynomial (or the size of the coefficient array minus one). The algorithm performs exactly $n$ multiplications and additions in a single linear loop, which is much more efficient than the naive $O(n^2)$ approach.
* **Space Complexity** : $O(1)$ because the calculation is performed in constant memory without any extra data structures.