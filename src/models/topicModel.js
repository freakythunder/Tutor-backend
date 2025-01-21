// src/config/topics.js

const defaultTopics =[
    {
      id: 1,
      name: "Variables & Data Types",
      subtopics: [
        { id: 1, name: "Declaring variables and using console.log() to log the values and use of comments in coding ( both single line and multi line comments)", completed: false },
        { id: 2, name: "Data types and using typeof & console.log() to log out the data types", completed: false },
        { id: 3, name: "Template literals for readable logging", completed: false },
      ],
      completed: false,
    },
    {
      id: 2,
      name: "Operators",
      subtopics: [
        { id: 1, name: "Arithmetic operators (+, -, *, /, %, **)", completed: false },
        { id: 2, name: "Assignment operators (=, +=, -=, etc.)", completed: false },
        { id: 3, name: "Comparison operators (==, ===, !=, !==, >, <, >=, <=)", completed: false },
        { id: 4, name: "Logical operators (&&, ||, !)", completed: false },
        { id: 5, name: "Increment and decrement operators (++, --)", completed: false },
        { id: 6, name: "Ternary operator (condition ? exprIfTrue : exprIfFalse)", completed: false },
      ],
      completed: false,
    },
    {
      id: 3,
      name: "Control Structures (if-else, switch statements)",
      subtopics: [
        { id: 1, name: "Basic if and else statements", completed: false },
        { id: 2, name: "else if for multiple conditions", completed: false },
        { id: 3, name: "Nesting if statements", completed: false },
        { id: 4, name: "switch statements with cases and default handling", completed: false },
      ],
      completed: false,
    },
    {
      id: 4,
      name: "Loops",
      subtopics: [
        { id: 1, name: "for loop basics", completed: false },
        { id: 2, name: "while loop", completed: false },
        { id: 3, name: "do...while loop", completed: false },
        { id: 4, name: "for...of loop (for arrays)", completed: false },
        { id: 5, name: "for...in loop (for objects)", completed: false },
        { id: 6, name: "Breaking and continuing loops (break, continue)", completed: false },
      ],
      completed: false,
    },
    {
      id: 5,
      name: "Arrays",
      subtopics: [
        { id: 1, name: "Declaring and initialising arrays", completed: false },
        { id: 2, name: "Accessing and modifying elements", completed: false },
        { id: 3, name: "Array properties (length)", completed: false },
        { id: 4, name: "Adding/removing elements (push, pop, shift, unshift)", completed: false },
        { id: 5, name: "Iterating with for, forEach, and map", completed: false },
        { id: 6, name: "Common methods: .map(), .filter(), .reduce(), .find(), .includes(), .slice(), .splice()", completed: false },
        { id: 7, name: "Nested arrays (2D arrays)", completed: false },
      ],
      completed: false,
    },
    {
      id: 6,
      name: "Objects",
      subtopics: [
        { id: 1, name: "Creating and accessing objects (dot notation, bracket notation)", completed: false },
        { id: 2, name: "Adding, updating, and deleting properties", completed: false },
        { id: 3, name: "this keyword", completed: false },
        { id: 4, name: "Object methods", completed: false },
        { id: 5, name: "Extracting keys/values (Object.keys(), Object.values())", completed: false },
        { id: 6, name: "Working with key-value pairs (Object.entries())", completed: false },
        { id: 7, name: "Shallow copying with Object.assign() and the spread operator", completed: false },
        { id: 8, name: "Nested objects and destructuring", completed: false },
      ],
      completed: false,
    },
    {
      id: 7,
      name: "Functions",
      subtopics: [
        { id: 1, name: "Declaring functions (declaration, expression, arrow functions)", completed: false },
        { id: 2, name: "Function parameters and arguments", completed: false },
        { id: 3, name: "Return values and return keyword", completed: false },
        { id: 4, name: "Scope (local vs. global)", completed: false },
        { id: 5, name: "Anonymous functions", completed: false },
        { id: 6, name: "Higher-order functions", completed: false },
        { id: 7, name: "Closures", completed: false },
        { id: 8, name: "Default parameters", completed: false },
        { id: 9, name: "Recursion", completed: false },
      ],
      completed: false,
    },
  ];
  
  module.exports = defaultTopics;