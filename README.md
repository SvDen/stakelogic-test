Here I will answer the questions.

# 1. Due to single responsibility principle we need to create another interface 

interface MathLibMultiply {
    multiply(numberA: number, numberB: number): number;
}

All requested classes should implement this interface. Also it would be nice to rename an existing interface to smth like "MathLibAdd"


# 2. In this example I like first method. I like functional-style proggramming and this looks clearly for me.

In addition I want to offer you even more readable (for my opinion) example:

private methodC(variableA: number, variableB: number): number {
  return Math.max(variableA, variableA)
}

# 3. Here we need to improve 2 things:

a) replace 'magic string' with enum constant (no typo's)
b) make sure that callback function is exist (no runtime error, it could be undefined or null)
