function evaluatePolynomial(coeffs, x) {
    if (coeffs.length === 0) return 0; //Safety check: if the array is empty, the result is 0.
    
    let res = coeffs[coeffs.length - 1]; //Initialize the result with the coefficient of the highest degree (the last element of the array).
    
    //Traverse the array from the second-to-last coefficient down to the first (index 0) backwards.
    for (let i = coeffs.length - 2; i >= 0; i--) {
        res = (res * x) + coeffs[i]; //Multiply the accumulated result by x, then add the current coefficient.
    }
    
    return res; 
}