
  const defaultTopics = [
    {
      id: 1,
      language: "JavaScript",
      topics: [
        {
          id: 1,
          name: "Variables & Data Types",
          subtopics: [
            { id: 1, name: "Declaring variables and using console.log() to log the values and use of comments in coding (both single line and multi line comments) in JS", completed: false },
            { id: 2, name: "Data types and using typeof & console.log() to log out the data types in JS", completed: false },
            { id: 3, name: "Template literals for readable logging in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 2,
          name: "Operators",
          subtopics: [
            { id: 1, name: "Arithmetic operators (+, -, *, /, %, **) in JS", completed: false },
            { id: 2, name: "Assignment operators (=, +=, -=, etc.) in Javascript in JS", completed: false },
            { id: 3, name: "Comparison operators (==, ===, !=, !==, >, <, >=, <=) in JS", completed: false },
            { id: 4, name: "Logical operators (&&, ||, !) in JS", completed: false },
            { id: 5, name: "Increment and decrement operators (++, --) in JS", completed: false },
            { id: 6, name: "Ternary operator (condition ? exprIfTrue : exprIfFalse) in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 3,
          name: "Control Structures (if-else, switch statements)",
          subtopics: [
            { id: 1, name: "Basic if and else statements in JS", completed: false },
            { id: 2, name: "else if for multiple conditions in JS", completed: false },
            { id: 3, name: "Nesting if statements in JS", completed: false },
            { id: 4, name: "switch statements with cases and default handling in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 4,
          name: "Loops",
          subtopics: [
            { id: 1, name: "for loop basics in JS", completed: false },
            { id: 2, name: "while loop in Javascript in JS", completed: false },
            { id: 3, name: "do...while loop in JS", completed: false },
            { id: 4, name: "for...of loop (for arrays) in JS", completed: false },
            { id: 5, name: "for...in loop (for objects) in JS", completed: false },
            { id: 6, name: "Breaking and continuing loops (break, continue) in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 5,
          name: "Arrays",
          subtopics: [
            { id: 1, name: "Declaring and initialising arrays in JS", completed: false },
            { id: 2, name: "Accessing and modifying elements in JS", completed: false },
            { id: 3, name: "Array properties (length) in JS", completed: false },
            { id: 4, name: "Adding/removing elements (push, pop, shift, unshift) in JS", completed: false },
            { id: 5, name: "Iterating with for, forEach, and map in JS", completed: false },
            { id: 6, name: "Common methods: .map(), .filter(), .reduce(), .find(), .includes(), .slice(), .splice() in JS", completed: false },
            { id: 7, name: "Nested arrays (2D arrays) in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 6,
          name: "Objects",
          subtopics: [
            { id: 1, name: "Creating and accessing objects (dot notation, bracket notation) in JS", completed: false },
            { id: 2, name: "Adding, updating, and deleting properties in JS", completed: false },
            { id: 3, name: "this keyword in JS", completed: false },
            { id: 4, name: "Object methods in JS", completed: false },
            { id: 5, name: "Extracting keys/values (Object.keys(), Object.values()) in JS", completed: false },
            { id: 6, name: "Working with key-value pairs (Object.entries()) in JS", completed: false },
            { id: 7, name: "Shallow copying with Object.assign() and the spread operator in JS", completed: false },
            { id: 8, name: "Nested objects and destructuring in JS", completed: false },
          ],
          completed: false,
        },
        {
          id: 7,
          name: "Functions",
          subtopics: [
            { id: 1, name: "Declaring functions (declaration, expression, arrow functions) in JS", completed: false },
            { id: 2, name: "Function parameters and arguments in JS", completed: false },
            { id: 3, name: "Return values and return keyword in JS", completed: false },
            { id: 4, name: "Scope (local vs. global) in JS", completed: false },
            { id: 5, name: "Anonymous functions in JS", completed: false },
            { id: 6, name: "Higher-order functions in JS", completed: false },
            { id: 7, name: "Closures in JS", completed: false },
            { id: 8, name: "Default parameters in JS", completed: false },
            { id: 9, name: "Recursion in JS", completed: false },
          ],
          completed: false,
        },
      ],
    },
    {
      "id": 2,
      "language": "C++",
      "topics": [
        {
          "id": 1,
          "name": "Basics of C++",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Writing and running your first C++ program in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Using cin and cout for basic I/O in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Formatting output in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "Input validation using cin.fail() in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 2,
          "name": "Variables, Data Types, and Constants",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring and initializing variables in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Basic data types in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "sizeof operator in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type modifiers in C++",
              "completed": false
            },
            {
              "id": 5,
              "name": "Constants in C++",
              "completed": false
            },
            {
              "id": 6,
              "name": "Type casting in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 3,
          "name": "Operators",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Arithmetic operators in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational operators in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical operators in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "Assignment operators in C++",
              "completed": false
            },
            {
              "id": 5,
              "name": "Ternary operator in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 4,
          "name": "Control Flow",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "if and else statements in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "else if ladder in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested if statements in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "switch statement in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 5,
          "name": "Loops",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "for loop in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "while loop in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "do-while loop in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "Nested loops in C++",
              "completed": false
            },
            {
              "id": 5,
              "name": "Control flow in loops in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 6,
          "name": "Arrays and Strings",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring and initializing arrays in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Accessing and modifying array elements in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Multidimensional arrays in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "C-style strings in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 7,
          "name": "Pointers",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Basics of pointers in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Pointer arithmetic in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 8,
          "name": "Functions",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Function declaration and definition in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Function parameters and return values in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Pass-by-value vs. pass-by-reference in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 9,
          "name": "Object-Oriented Programming (OOP)",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Classes and objects in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Access modifiers in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Member functions and constructors in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "this pointer in C++",
              "completed": false
            },
            {
              "id": 5,
              "name": "Static members in C++",
              "completed": false
            },
            {
              "id": 6,
              "name": "Destructors in C++",
              "completed": false
            },
            {
              "id": 7,
              "name": "Inheritance in C++",
              "completed": false
            },
            {
              "id": 8,
              "name": "Polymorphism in C++",
              "completed": false
            },
            {
              "id": 9,
              "name": "Abstract classes in C++",
              "completed": false
            },
            {
              "id": 10,
              "name": "Encapsulation in C++",
              "completed": false
            },
            {
              "id": 11,
              "name": "Friend functions in C++",
              "completed": false
            },
            {
              "id": 12,
              "name": "Operator overloading in C++",
              "completed": false
            }
          ]
        },
        {
          "id": 10,
          "name": "Standard Template Library (STL)",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Introduction to STL in C++",
              "completed": false
            },
            {
              "id": 2,
              "name": "Vectors in C++",
              "completed": false
            },
            {
              "id": 3,
              "name": "Iterators in C++",
              "completed": false
            },
            {
              "id": 4,
              "name": "Lists and queues in C++",
              "completed": false
            },
            {
              "id": 5,
              "name": "Sets and maps in C++",
              "completed": false
            },
            {
              "id": 6,
              "name": "Stacks and deques in C++",
              "completed": false
            },
            {
              "id": 7,
              "name": "Algorithms in C++",
              "completed": false
            },
            {
              "id": 8,
              "name": "Merge sort and bubble sort in C++",
              "completed": false
            },
            {
              "id": 9,
              "name": "Pair and tuple in C++",
              "completed": false
            },
            {
              "id": 10,
              "name": "Priority queues in C++",
              "completed": false
            },
            {
              "id": 11,
              "name": "Lambda functions in C++",
              "completed": false
            },
            {
              "id": 12,
              "name": "Custom comparators in C++",
              "completed": false
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "language": "Java",
      "topics": [
        {
          "id": 1,
          "name": "Introduction to Java",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Hello World Program in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Structure of a Java Program in java",
              "completed": false
            }
          ]
        },
        {
          "id": 2,
          "name": "Basics of Java",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Data Types in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Variables in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Constants in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type Casting in java",
              "completed": false
            },
            {
              "id": 5,
              "name": "Basic I/O in java",
              "completed": false
            }
          ]
        },
        {
          "id": 3,
          "name": "Operators",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Arithmetic Operators in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational Operators in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical Operators in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Assignment Operators in java",
              "completed": false
            },
            {
              "id": 5,
              "name": "Unary Operators in java",
              "completed": false
            },
            {
              "id": 6,
              "name": "Ternary Operator in java",
              "completed": false
            }
          ]
        },
        {
          "id": 4,
          "name": "Control Flow",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Decision-Making Statements (if, else if, else) in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "switch Statements in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Loops (for, while, do-while) in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Nested Loops in java",
              "completed": false
            },
            {
              "id": 5,
              "name": "Jump Statements (break, continue, return) in java",
              "completed": false
            }
          ]
        },
        {
          "id": 5,
          "name": "Arrays",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "One-Dimensional Arrays in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Multi-Dimensional Arrays in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Common Operations in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Array Methods in java",
              "completed": false
            }
          ]
        },
        {
          "id": 6,
          "name": "Strings",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "String Basics in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "String Methods in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "StringBuilder and StringBuffer in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "String Manipulation in java",
              "completed": false
            }
          ]
        },
        {
          "id": 7,
          "name": "Object-Oriented Programming (OOP)",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Classes and Objects in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Constructors in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Encapsulation in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Inheritance in java",
              "completed": false
            },
            {
              "id": 5,
              "name": "Polymorphism in java",
              "completed": false
            },
            {
              "id": 6,
              "name": "Abstraction in java",
              "completed": false
            },
            {
              "id": 7,
              "name": "this Keyword in java",
              "completed": false
            }
          ]
        },
        {
          "id": 8,
          "name": "Methods",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring Methods in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Static vs. Non-Static Methods in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Method Overloading/Overriding in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Recursion in java",
              "completed": false
            }
          ]
        },
        {
          "id": 9,
          "name": "Exception Handling",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Checked vs. Unchecked Exceptions in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Try-Catch Blocks in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Finally Block in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Throw and Throws in java",
              "completed": false
            }
          ]
        },
        {
          "id": 10,
          "name": "Collections Framework",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "List Interface (ArrayList, LinkedList) in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Set Interface (HashSet, TreeSet) in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Map Interface (HashMap, TreeMap) in java",
              "completed": false
            },
            {
              "id": 4,
              "name": "Iteration (Iterator, Enhanced For) in java",
              "completed": false
            }
          ]
        },
        {
          "id": 11,
          "name": "Multithreading",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Threads (Thread Class, Runnable) in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Synchronization in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Concurrency (ExecutorService) in java",
              "completed": false
            }
          ]
        },
        {
          "id": 12,
          "name": "Java 8 Features",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Lambda Expressions in java",
              "completed": false
            },
            {
              "id": 2,
              "name": "Streams API in java",
              "completed": false
            },
            {
              "id": 3,
              "name": "Functional Interfaces in java",
              "completed": false
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "language": "Python",
      "topics": [
        {
          "id": 1,
          "name": "Basics of Python",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Writing and running your first Python program and use of comments (single-line and multi-line) in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Using input() for user input in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Printing to the console using print() in python",
              "completed": false
            }
          ]
        },
        {
          "id": 2,
          "name": "Variables, Data Types, and Constants",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring and initializing variables in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Basic data types (int, float, str, bool) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Using type() to check data types in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type casting (implicit and explicit) in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Dynamic typing in Python in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Constants and naming conventions in python",
              "completed": false
            }
          ]
        },
        {
          "id": 3,
          "name": "Input and Output",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Using input() for user input (Advanced) in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Printing to the console using print()(Advanced) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "String formatting with f-strings, .format(), and % in python",
              "completed": false
            }
          ]
        },
        {
          "id": 4,
          "name": "Operators",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Arithmetic operators (+, -, *, /, //, %, **) in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational operators (==, !=, >, <, >=, <=) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical operators (and, or, not) in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Bitwise operators (&, |, ^, ~, <<, >>) in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Assignment operators (=, +=, -=, etc.) in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Membership operators (in, not in) in python",
              "completed": false
            },
            {
              "id": 7,
              "name": "Identity operators (is, is not) in python",
              "completed": false
            },
            {
              "id": 8,
              "name": "Ternary operator in python",
              "completed": false
            }
          ]
        },
        {
          "id": 5,
          "name": "Control Flow",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "if and else statements in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "elif for multiple conditions in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested if statements in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Using conditional expressions (ternary operator) in python",
              "completed": false
            }
          ]
        },
        {
          "id": 6,
          "name": "Loops",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "for loops in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "while loops in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested loops in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Control flow in loops (break, continue, pass) in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Iterating with range() in python",
              "completed": false
            }
          ]
        },
        {
          "id": 7,
          "name": "Strings",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring and initializing strings in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "String methods (.upper(), .lower(), .strip(), .replace(), .find(), .split(), .join(), etc.) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "String slicing and indexing in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "String immutability in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Multi-line strings with triple quotes in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Iterating over strings using loops in python",
              "completed": false
            }
          ]
        },
        {
          "id": 8,
          "name": "Lists",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Declaring and initializing lists in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Accessing and modifying list elements in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "List methods (.append(), .extend(), .insert(), .remove(), .pop(), .index(), .sort(), .reverse(), etc.) in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "List slicing and indexing in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Nested lists (2D lists) in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "List comprehensions in python",
              "completed": false
            }
          ]
        },
        {
          "id": 9,
          "name": "Tuples and Sets",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Creating and accessing tuples in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Tuple immutability and unpacking in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Creating and using sets in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Set operations (union, intersection, difference, symmetric_difference) in python",
              "completed": false
            }
          ]
        },
        {
          "id": 10,
          "name": "Dictionaries",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Creating and accessing dictionaries in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Adding, updating, and deleting key-value pairs in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Dictionary methods (.keys(), .values(), .items(), .get(), .pop(), .update()) in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Iterating through dictionaries in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Nested dictionaries and dictionary comprehension in python",
              "completed": false
            }
          ]
        },
        {
          "id": 11,
          "name": "Functions",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Defining and calling functions in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Function parameters and arguments (positional, keyword, default) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Return values and the return keyword in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Variable scope (global vs. local) in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Lambda functions in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Higher-order functions in python",
              "completed": false
            },
            {
              "id": 7,
              "name": "Recursion in python",
              "completed": false
            }
          ]
        },
        {
          "id": 12,
          "name": "Object-Oriented Programming (OOP)",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Classes and objects in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Attributes and methods in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Constructors (init()) in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "self parameter in python",
              "completed": false
            },
            {
              "id": 5,
              "name": "Inheritance in python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Polymorphism (method overriding) in python",
              "completed": false
            },
            {
              "id": 7,
              "name": "Encapsulation (private and protected members) in python",
              "completed": false
            },
            {
              "id": 8,
              "name": "Static methods and class methods in python",
              "completed": false
            }
          ]
        },
        {
          "id": 13,
          "name": "Modules and Packages",
          "completed": false,
          "subtopics": [
            {
              "id": 1,
              "name": "Importing modules (import, from ... import) in python",
              "completed": false
            },
            {
              "id": 2,
              "name": "Common built-in modules (os, math, random, datetime) in python",
              "completed": false
            },
            {
              "id": 3,
              "name": "Creating custom modules in python",
              "completed": false
            },
            {
              "id": 4,
              "name": "Using and managing Python packages with pip in python",
              "completed": false
            }
          ]
        }
      ]
    }];



      
  module.exports = defaultTopics;