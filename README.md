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

* **Description** : This fonction take a text in input and return if the symbol is well placed and well close. For this we parse all the text and we create an index of symbol open associate with her close symbole and for each open character we add it to a list and when we have a close symbol we look if it was the close symbol of the last open symbol in the list if not we return False and if and the end the list is not empty we return False too because it's signifie that open symbol has no close symbole, if at the end the list is empty we return True

### Exercise 4: Polynomial Evaluation (Horner's Method)
* **Description** : This function evaluates a polynomial for a given real value $x$ using an array of coefficients. Rather than using the naive approach (which calculates each power of $x$ separately), it implements **Horner's method** to optimize computation and minimize the number of operations.

---

## Complexity Analysis Summary

### Exercise 1
* **Time Complexity** : $O(\log_{10} n)$ or $O(d)$ where $d$ is the number of digits in integer $n$. The loop runs as many times as there are digits in the number.
* **Space Complexity** : $O(1)$ because only a few temporary variables are used, regardless of the size of $n$.

### Exercise 2
* **Time Complexity** :  O(n) because the list is traversed only one time. So if we add a comparaison character that change nothing to the complexity.

### Exercise 4 
* **Time Complexity** : $O(n)$ where $n$ is the degree of the polynomial (or the size of the coefficient array minus one). The algorithm performs exactly $n$ multiplications and additions in a single linear loop, which is much more efficient than the naive $O(n^2)$ approach.
* **Space Complexity** : $O(1)$ because the calculation is performed in constant memory without any extra data structures.