/*
Exercise 1
Timmy & Sarah think they are in love, but around where they live, they will only know once they pick a flower each. 
If one of the flowers has an even number of petals and the other has an odd number of petals it means they are in love.

Write a function that will take the number of petals of each flower and return true if they are in love and false if they aren't.
*/

interface FlowerPetals {
    petals: number;
}

function isEven(num: number): boolean {
    return num % 2 === 0;
}

// function isOdd(num: number): boolean {
//     return num % 2 !== 0;
// }

function areTheyInLove1(flower1: FlowerPetals, flower2: FlowerPetals): boolean {
    if (!Number.isInteger(flower1.petals) || !Number.isInteger(flower2.petals)) {
        throw new Error('Petals must be integers');
    }

    return (isEven(flower1.petals) !== isEven(flower2.petals));
}

function areTheyInLove2(flower1: FlowerPetals, flower2: FlowerPetals): string {
    if (!Number.isInteger(flower1.petals) || !Number.isInteger(flower2.petals)) {
        throw new Error('Petals must be integers');
    }

    if (isEven(flower1.petals) !== isEven(flower2.petals)) {
        return "They are in love";
    }
    return "They are not in love";
}


console.log(areTheyInLove1({ petals: 4 }, { petals: 5 }));
console.log(areTheyInLove1({ petals: 7 }, { petals: 3 }));
console.log(areTheyInLove1({ petals: 2 }, { petals: 8 }));

console.log(areTheyInLove2({ petals: 4 }, { petals: 5 }));
console.log(areTheyInLove2({ petals: 7 }, { petals: 3 }));
console.log(areTheyInLove2({ petals: 2 }, { petals: 8 }));



/*
Exercise 2
Create interface Person that will have the following properties:

name which is string,
age which is number and
gender which is 'male' or 'female'.
Create a function named filterByProperty. The function should accept three parameters:

people => which is array of Person objects
property => which is string
value => which is string
So if we invoke the function filterByProperty as filterByProperty(peopleArray, "gender", "male") 
it should return the objects of the peopleArray that its gender is male, and if we invoke 
the function filterByProperty as filterByProperty(peopleArray, "age", 30) it should return 
the objects of the peopleArray that its age is 30.
*/

enum GENDER {
    male = 'male',
    female = 'female'
}

interface Person {
    name: string,
    age: number;
    gender: GENDER

}

const peopleArray: Person[] = [
    { name: 'Jane Smith', age: 25, gender: GENDER.female },
    { name: 'Bob Bobski', age: 30, gender: GENDER.male },
    { name: 'John Doe', age: 30, gender: GENDER.male }
];


function filterByProperty(
    people: Person[],
    property: keyof Person,
    value: string | number | GENDER
): Person[] {
    return people.filter(person => person[property] === value);
}

console.log(filterByProperty(peopleArray, 'gender', 'male'));

console.log(filterByProperty(peopleArray, 'age', 30));

console.log(filterByProperty(peopleArray, 'name', 'Jane Smith'));

/*
Exercise 3
Given an array of numbers, return a new array with each value doubled.

For example:

[1, 2, 3] --> [2, 4, 6]
*/

//Various solutions
//with map

function doubleValueArray(numbers: number[]): number[] {
    return numbers.map(num => num * 2);
}

function checkDoubleArray(numbers: number[]): number[] {
    return numbers.map(num => {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('Array must contain only numbers');
        }
        if (num === 0) {
            throw new Error('Array cannot contain zero');
        }
        return num * 2;
    });
}

const doubled = [1, 2, 3].map(n => n * 2);

//with reduce

function doubleWithReduce(numbers: number[]): number[] {
    return numbers.reduce<number[]>((acc, num) => [...acc, num * 2], []);
}

//with loop

function doubleWithLoop(numbers: number[]): number[] {
    const result = [];
    for (const num of numbers) {
        result.push(num * 2);
    }
    return result;
}

const numArr: number[] = [1, 2, 4]
const numArr1: number[] = [2, 2, 2]

console.log(doubleValueArray([1, 2, 3]));

console.log(doubleValueArray(numArr));

console.log('Checked', checkDoubleArray(numArr1));

console.log(doubled);

console.log(doubleWithReduce(numArr));

console.log(doubleWithLoop(numArr));


console.log(numArr);



/*
Exercise 4
Implement a function which convert the given boolean value into its string representation.

Note: Only valid inputs will be given.
*/

function booleanToString1(value: boolean): string {
    return value.toString();
}


function booleanToString2(value: boolean): string {
    return `${value}`;
}

function booleanToString3(value: boolean): string {
    return value ? 'true' : 'false';
}

console.log(booleanToString1(true));
console.log(booleanToString2(false));
console.log(booleanToString3(true));

console.log(typeof (booleanToString1(true)));
console.log(typeof (booleanToString2(false)));
console.log(typeof (booleanToString3(true)));



/*
Exercise 5
Write a function which calculates the average of the numbers in a given list.

Note: Empty arrays should return 0.
*/

// Implemented various solutions

// Solution 1 with reduce

const numberList: number[] = [1, 3, 3]

function averageNumber1(numbers: number[]): number {
    if (numbers.length === 0) return 0;

    // Cannot divide inside of the reduce, instead divide afterthe reduce func
    // return numbers.reduce((acc, num) => acc + num, 0 / numbers.length); -> wrong

    // corrected
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}

/*
or:
function averageNumber1(numbers: number[]): number {
return numbers.length 
    ? numbers.reduce((a, b) => a + b, 0) / numbers.length 
    : 0;
}
*/

// Solution 2 with reduce

function calculateAverage1(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Solution 3 with loop

function calculateAverage2(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    let sum = 0;
    for (const num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}

// Solution 4 with reduce and ternary operator

function calculateAverage3(numbers: number[]): number {
    // Missing starting value for the accumulator, 0
    // return numbers.length ? numbers.reduce((a, b) => a + b) / numbers.length : 0; -> wrong
    return numbers.length 
    ? numbers.reduce((a, b) => a + b, 0) / numbers.length 
    : 0;
}

console.log("averageNumber1");

console.log(averageNumber1([10, 20, 3]));
console.log(averageNumber1([-1, 0, 1]));
console.log(averageNumber1([]));
console.log(averageNumber1(numberList));


console.log("calculateAverage1");

console.log(calculateAverage1([1, 2, 3]));
console.log(calculateAverage1([-1, 0, 1]));
console.log(calculateAverage1([]));

console.log("calculateAverage2");

console.log(calculateAverage2([1, 2, 3]));
console.log(calculateAverage2([-1, 0, 1]));
console.log(calculateAverage2([]));

console.log("calculateAverage3");

console.log(calculateAverage3([1, 2, 3]));
console.log(calculateAverage3([-1, 0, 1]));
console.log(calculateAverage3([]));


/*
Exercise 6
There was a test in your class and you passed it. Congratulations! But you're an ambitious person. 
You want to know if you're better than the average student in your class.

You receive an array with your peers' test scores. Now calculate the average and compare your score!

Return True if you're better, else False!

Note: Your points are not included in the array of your class's points. For calculating the average 
point you may add your point to the given array!
*/

// Solution 1 with deep copy (just for some fun ;) and to make Borche proud of me :) )

function isMyScoreBetter1(myScore: number, classScores: number[]): boolean {
    if (classScores.length === 0) return false;
    if (!classScores) return false;
    if (typeof myScore !== 'number' || isNaN(myScore)) return false;
    //we can also implement enum check for the grades

    const allScores = [...classScores, myScore];
    const deepCopyAllScores = JSON.parse(JSON.stringify(allScores));
    const average = deepCopyAllScores.reduce((sum: number, score: number) => sum + score, 0) / deepCopyAllScores.length;

    return myScore > average;
}

// Solution 2 without deep copy

function isMyScoreBetter2(myScore: number, classScores: number[]): boolean {
    if (classScores.length === 0) return false;
    const allScores = [...classScores, myScore];
    const average = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
    return myScore > average;
}

console.log(isMyScoreBetter1(80, [50, 60, 70]));
console.log(isMyScoreBetter1(60, [80, 90, 100]));
console.log(isMyScoreBetter1(100, []));

console.log(isMyScoreBetter2(80, [50, 60, 70]));
console.log(isMyScoreBetter2(60, [80, 90, 100]));
console.log(isMyScoreBetter2(100, []));


/*
Exercise 7
Given an array of numbers.

Return an array, where the first element is the count of positives numbers and the second element 
is sum of negative numbers. 0 is neither positive nor negative.

If the input is an empty array or is null, return an empty array. Example

For input [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15], you should return [10, -65].
*/

const mixedArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -1, -2, -3, -4, -5];

// Solution 1

function countPositivesSumNegatives(input: number[] | null): number[] {

    if (!input || input.length === 0) return [];


    let positiveCount = 0;
    let negativeSum = 0;


    for (const num of input) {
        if (num > 0) {
            positiveCount++;
        } else if (num < 0) {
            negativeSum += num;
        }
        // Ignore zeros
    }

    return [positiveCount, negativeSum];
}

// Solution 2 with reducer

function countPosSumNeg(input: number[] | null): number[] {
    if (!input || !input.length) return [];

    return input.reduce(([count, sum], num) => (
        num > 0 ? [count + 1, sum] :
            num < 0 ? [count, sum + num] :
                [count, sum]
    ), [0, 0]);
}



console.log(countPositivesSumNegatives(mixedArr)); // [10, -15]
console.log(countPositivesSumNegatives(null)); // []
console.log(countPositivesSumNegatives([])); // []
console.log(countPositivesSumNegatives([0, 0, 0])); // [0, 0]
console.log(countPositivesSumNegatives([-1, -2, -3])); // [0, -6]

console.log(countPosSumNeg(mixedArr)); // [10, -15]
console.log(countPosSumNeg(null)); // []
console.log(countPosSumNeg([])); // []
console.log(countPosSumNeg([0, 0, 0])); // [0, 0]
console.log(countPosSumNeg([-1, -2, -3])); // [0, -6]

/*
Exercise 8
Create a function that takes a number as an argument and returns "Even" for even numbers or "Odd" for odd numbers.
*/
// Solution 1

function evenOrOdd(num: number) {
    return num % 2 === 0 ? 'Even' : 'Odd'

}

console.log(evenOrOdd(4));

function evenOrOdd1(num: number): string {
    return num % 2 === 0 ? "Even" : "Odd";
}

// solution 2 with bitwise operator 

function evenOrOdd2(num: number): string {
    return (num & 1) ? "Odd" : "Even";
}

// solution 3 

function evenOrOdd3(num: number): string {
    if (num % 2 === 0) return "Even";
    return "Odd";
}

console.log(evenOrOdd1(4));
console.log(evenOrOdd2(4));
console.log(evenOrOdd3(4));
console.log(evenOrOdd3(5));

/*
Exercise 9
Implement a Basic Calculator

Description: Create a basic calculator application using TypeScript. The calculator should support 
addition, subtraction, multiplication, and division operations.

Requirements: Use TypeScript for defining types, interfaces etc. Implement functions for performing 
basic arithmetic operations. Ensure error handling for division by zero and invalid inputs.
*/

// solution 1

enum Operation {
    Add = 'ADD',
    Subtract = 'SUBTRACT',
    Multiply = 'MULTIPLY',
    Divide = 'DIVIDE'
}

type CalculatorResult = number | never;

function isValidNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

function calculate(a: number, b: number, operation: Operation): CalculatorResult {
    if (!isValidNumber(a) || !isValidNumber(b)) {
        throw new Error('Invalid input: Both operands must be valid numbers');
    }

    switch (operation) {
        case Operation.Add:
            return a + b;
        case Operation.Subtract:
            return a - b;
        case Operation.Multiply:
            return a * b;
        case Operation.Divide:
            if (b === 0) throw new Error('Division by zero is not allowed');
            return a / b;
        default:
            throw new Error('Invalid operation');
    }
}

// Examples
try {
    console.log('5 + 3 =', calculate(5, 3, Operation.Add));       // 8
    console.log('10 - 4 =', calculate(10, 4, Operation.Subtract)); // 6
    console.log('7 * 2 =', calculate(7, 2, Operation.Multiply));   // 14
    console.log('15 / 3 =', calculate(15, 3, Operation.Divide));   // 5

    // Errors
    console.log(calculate(5, 0, Operation.Divide));  // Throws error
} catch (error) {
    console.error('Error:', (error as Error).message);
}

try {
    console.log(calculate(5, 'a' as any, Operation.Add));  // Throws error
} catch (error) {
    console.error('Error:', (error as Error).message);
}


/*

// solution 2

import * as readline from 'readline';

// Define calculator interface
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number | string; // Return string for error handling
}

// Implement Calc i-face
class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number | string {
        if (b === 0) {
            return "Error: Division by zero is not allowed.";
        }
        return a / b;
    }
}

// validate input
function validateInput(input: string): number {
    const number = Number(input);
    if (isNaN(number)) {
        throw new Error("Invalid input: Please enter a valid number.");
    }
    return number;
}

// validate operation
function validateOperation(operation: string): string {
    const validOperations = ["+", "-", "*", "/"];
    if (!validOperations.includes(operation)) {
        throw new Error("Invalid operation: Please enter one of +, -, *, /.");
    }
    return operation;
}

// interface for reading input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ask for a valid number
function askForNumber(promptText: string): Promise<number> {
    return new Promise((resolve) => {
        rl.question(promptText, (input: string) => {
            try {
                const validNumber = validateInput(input);
                resolve(validNumber);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                // Ask again for a valid number
                resolve(askForNumber(promptText));
            }
        });
    });
}

// ask for a valid operation
function askForOperation(): Promise<string> {
    return new Promise((resolve) => {
        rl.question("Enter the operation (+, -, *, /): ", (operation: string) => {
            try {
                const validOperation = validateOperation(operation);
                resolve(validOperation);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
                // Ask again for a valid operation
                resolve(askForOperation());
            }
        });
    });
}

// ask input and perform calculations
async function askQuestions() {
    try {
        const num1 = await askForNumber("Enter the first number: ");
        const num2 = await askForNumber("Enter the second number: ");
        const operation = await askForOperation();

        const calculator = new BasicCalculator();
        let result: number | string;

        switch (operation) {
            case "+":
                result = calculator.add(num1, num2);
                break;
            case "-":
                result = calculator.subtract(num1, num2);
                break;
            case "*":
                result = calculator.multiply(num1, num2);
                break;
            case "/":
                result = calculator.divide(num1, num2);
                break;
            default:
                // This case should never be reached due to validation
                throw new Error("Invalid operation.");
        }

        console.log(`Result: ${result}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    } finally {
        rl.close(); // Close the readline interface
    }
}

// Start the question-asking process
askQuestions();


*/


// solution 3

import * as readline from 'readline';

// Domain Layer
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
    multiply(a: number, b: number): number;
    divide(a: number, b: number): number;
}

class BasicCalculator implements Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }

    divide(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero is not allowed");
        return a / b;
    }
}

// Application Layer
class CalculatorService {
    private calculator: Calculator;

    constructor(calculator: Calculator) {
        this.calculator = calculator;
    }

    executeOperation(a: number, b: number, operator: string): number {
        switch (operator) {
            case "+": return this.calculator.add(a, b);
            case "-": return this.calculator.subtract(a, b);
            case "*": return this.calculator.multiply(a, b);
            case "/": return this.calculator.divide(a, b);
            default: throw new Error("Invalid operation");
        }
    }
}
// solution variation of part of the code

/*

// UI Layer
class CommandLineInterface {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    async askForNumber(prompt: string): Promise<number> {
        while (true) {
            const input = await this.question(prompt);
            const parsed = Number(input);
            
            if (!isNaN(parsed)) return parsed;
            console.log("Invalid number. Please try again.");
        }
    }

    async askForOperation(): Promise<string> {
        const validOperations = ["+", "-", "*", "/"];
        
        while (true) {
            const input = await this.question("Enter operation (+, -, *, /): ");
            if (validOperations.includes(input)) return input;
            console.log("Invalid operation. Please try again.");
        }
    }

    private question(prompt: string): Promise<string> {
        return new Promise(resolve => this.rl.question(prompt, resolve));
    }

    close() {
        this.rl.close();
    }
}

// Validation Layer (Optional - Could be integrated into UI layer)
class InputValidator {
    static validateNumber(input: string): number {
        const number = Number(input);
        if (isNaN(number)) throw new Error("Invalid number format");
        return number;
    }

    static validateOperation(input: string): string {
        const validOperations = ["+", "-", "*", "/"];
        if (!validOperations.includes(input)) throw new Error("Invalid operation");
        return input;
    }
}

*/

class CommandLineInterface {
    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Integrated validation for numbers
    async askForNumber(prompt: string): Promise<number> {
        while (true) {
            try {
                const input = await this.question(prompt);
                const number = Number(input);
                
                if (isNaN(number)) throw new Error("Invalid number format");
                return number;
                
            } catch (error) {
                console.error(error instanceof Error ? error.message : "Invalid input");
            }
        }
    }

    // Integrated validation for operations
    async askForOperation(): Promise<string> {
        const validOperations = ["+", "-", "*", "/"];
        
        while (true) {
            try {
                const input = await this.question("Enter operation (+, -, *, /): ");
                
                if (!validOperations.includes(input)) {
                    throw new Error("Invalid operation");
                }
                return input;
                
            } catch (error) {
                console.error(error instanceof Error ? error.message : "Invalid operation");
            }
        }
    }

    private question(prompt: string): Promise<string> {
        return new Promise(resolve => this.rl.question(prompt, resolve));
    }

    close() {
        this.rl.close();
    }
}


// Application Composition
async function main() {
    const cli = new CommandLineInterface();
    const calculator = new BasicCalculator();
    const service = new CalculatorService(calculator);

    try {
        const num1 = await cli.askForNumber("Enter first number: ");
        const num2 = await cli.askForNumber("Enter second number: ");
        const operation = await cli.askForOperation();

        const result = service.executeOperation(num1, num2, operation);
        console.log(`Result: ${result}`);
    } catch (error) {
        console.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
        cli.close();
    }
}

// Start the application
main();
