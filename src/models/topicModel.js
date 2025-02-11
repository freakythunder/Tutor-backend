
  const defaultTopics = [
    {
      id: 1,
      language: "JavaScript",
      topics: [
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
              "name": "Writing and running your first C++ program",
              "completed": false
            },
            {
              "id": 2,
              "name": "Using cin and cout for basic I/O",
              "completed": false
            },
            {
              "id": 3,
              "name": "Formatting output",
              "completed": false
            },
            {
              "id": 4,
              "name": "Input validation using cin.fail()",
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
              "name": "Basic data types",
              "completed": false
            },
            {
              "id": 3,
              "name": "sizeof operator",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type modifiers",
              "completed": false
            },
            {
              "id": 5,
              "name": "Constants",
              "completed": false
            },
            {
              "id": 6,
              "name": "Type casting",
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
              "name": "Arithmetic operators",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational operators",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical operators",
              "completed": false
            },
            {
              "id": 4,
              "name": "Assignment operators",
              "completed": false
            },
            {
              "id": 5,
              "name": "Ternary operator",
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
              "name": "if and else statements",
              "completed": false
            },
            {
              "id": 2,
              "name": "else if ladder",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested if statements",
              "completed": false
            },
            {
              "id": 4,
              "name": "switch statement",
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
              "name": "for loop",
              "completed": false
            },
            {
              "id": 2,
              "name": "while loop",
              "completed": false
            },
            {
              "id": 3,
              "name": "do-while loop",
              "completed": false
            },
            {
              "id": 4,
              "name": "Nested loops",
              "completed": false
            },
            {
              "id": 5,
              "name": "Control flow in loops",
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
              "name": "Declaring and initializing arrays",
              "completed": false
            },
            {
              "id": 2,
              "name": "Accessing and modifying array elements",
              "completed": false
            },
            {
              "id": 3,
              "name": "Multidimensional arrays",
              "completed": false
            },
            {
              "id": 4,
              "name": "C-style strings",
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
              "name": "Basics of pointers",
              "completed": false
            },
            {
              "id": 2,
              "name": "Pointer arithmetic",
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
              "name": "Function declaration and definition",
              "completed": false
            },
            {
              "id": 2,
              "name": "Function parameters and return values",
              "completed": false
            },
            {
              "id": 3,
              "name": "Pass-by-value vs. pass-by-reference",
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
              "name": "Classes and objects",
              "completed": false
            },
            {
              "id": 2,
              "name": "Access modifiers",
              "completed": false
            },
            {
              "id": 3,
              "name": "Member functions and constructors",
              "completed": false
            },
            {
              "id": 4,
              "name": "this pointer",
              "completed": false
            },
            {
              "id": 5,
              "name": "Static members",
              "completed": false
            },
            {
              "id": 6,
              "name": "Destructors",
              "completed": false
            },
            {
              "id": 7,
              "name": "Inheritance",
              "completed": false
            },
            {
              "id": 8,
              "name": "Polymorphism",
              "completed": false
            },
            {
              "id": 9,
              "name": "Abstract classes",
              "completed": false
            },
            {
              "id": 10,
              "name": "Encapsulation",
              "completed": false
            },
            {
              "id": 11,
              "name": "Friend functions",
              "completed": false
            },
            {
              "id": 12,
              "name": "Operator overloading",
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
              "name": "Introduction to STL",
              "completed": false
            },
            {
              "id": 2,
              "name": "Vectors",
              "completed": false
            },
            {
              "id": 3,
              "name": "Iterators",
              "completed": false
            },
            {
              "id": 4,
              "name": "Lists and queues",
              "completed": false
            },
            {
              "id": 5,
              "name": "Sets and maps",
              "completed": false
            },
            {
              "id": 6,
              "name": "Stacks and deques",
              "completed": false
            },
            {
              "id": 7,
              "name": "Algorithms",
              "completed": false
            },
            {
              "id": 8,
              "name": "Merge sort and bubble sort",
              "completed": false
            },
            {
              "id": 9,
              "name": "Pair and tuple",
              "completed": false
            },
            {
              "id": 10,
              "name": "Priority queues",
              "completed": false
            },
            {
              "id": 11,
              "name": "Lambda functions",
              "completed": false
            },
            {
              "id": 12,
              "name": "Custom comparators",
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
              "name": "Hello World Program",
              "completed": false
            },
            {
              "id": 2,
              "name": "Structure of a Java Program",
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
              "name": "Data Types",
              "completed": false
            },
            {
              "id": 2,
              "name": "Variables",
              "completed": false
            },
            {
              "id": 3,
              "name": "Constants",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type Casting",
              "completed": false
            },
            {
              "id": 5,
              "name": "Basic I/O",
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
              "name": "Arithmetic Operators",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational Operators",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical Operators",
              "completed": false
            },
            {
              "id": 4,
              "name": "Assignment Operators",
              "completed": false
            },
            {
              "id": 5,
              "name": "Unary Operators",
              "completed": false
            },
            {
              "id": 6,
              "name": "Ternary Operator",
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
              "name": "Decision-Making Statements (if, else if, else)",
              "completed": false
            },
            {
              "id": 2,
              "name": "switch Statements",
              "completed": false
            },
            {
              "id": 3,
              "name": "Loops (for, while, do-while)",
              "completed": false
            },
            {
              "id": 4,
              "name": "Nested Loops",
              "completed": false
            },
            {
              "id": 5,
              "name": "Jump Statements (break, continue, return)",
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
              "name": "One-Dimensional Arrays",
              "completed": false
            },
            {
              "id": 2,
              "name": "Multi-Dimensional Arrays",
              "completed": false
            },
            {
              "id": 3,
              "name": "Common Operations",
              "completed": false
            },
            {
              "id": 4,
              "name": "Array Methods",
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
              "name": "String Basics",
              "completed": false
            },
            {
              "id": 2,
              "name": "String Methods",
              "completed": false
            },
            {
              "id": 3,
              "name": "StringBuilder and StringBuffer",
              "completed": false
            },
            {
              "id": 4,
              "name": "String Manipulation",
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
              "name": "Classes and Objects",
              "completed": false
            },
            {
              "id": 2,
              "name": "Constructors",
              "completed": false
            },
            {
              "id": 3,
              "name": "Encapsulation",
              "completed": false
            },
            {
              "id": 4,
              "name": "Inheritance",
              "completed": false
            },
            {
              "id": 5,
              "name": "Polymorphism",
              "completed": false
            },
            {
              "id": 6,
              "name": "Abstraction",
              "completed": false
            },
            {
              "id": 7,
              "name": "this Keyword",
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
              "name": "Declaring Methods",
              "completed": false
            },
            {
              "id": 2,
              "name": "Static vs. Non-Static Methods",
              "completed": false
            },
            {
              "id": 3,
              "name": "Method Overloading/Overriding",
              "completed": false
            },
            {
              "id": 4,
              "name": "Recursion",
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
              "name": "Checked vs. Unchecked Exceptions",
              "completed": false
            },
            {
              "id": 2,
              "name": "Try-Catch Blocks",
              "completed": false
            },
            {
              "id": 3,
              "name": "Finally Block",
              "completed": false
            },
            {
              "id": 4,
              "name": "Throw and Throws",
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
              "name": "List Interface (ArrayList, LinkedList)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Set Interface (HashSet, TreeSet)",
              "completed": false
            },
            {
              "id": 3,
              "name": "Map Interface (HashMap, TreeMap)",
              "completed": false
            },
            {
              "id": 4,
              "name": "Iteration (Iterator, Enhanced For)",
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
              "name": "Threads (Thread Class, Runnable)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Synchronization",
              "completed": false
            },
            {
              "id": 3,
              "name": "Concurrency (ExecutorService)",
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
              "name": "Lambda Expressions",
              "completed": false
            },
            {
              "id": 2,
              "name": "Streams API",
              "completed": false
            },
            {
              "id": 3,
              "name": "Functional Interfaces",
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
              "name": "Writing and running your first Python program and use of comments (single-line and multi-line)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Using input() for user input",
              "completed": false
            },
            {
              "id": 3,
              "name": "Printing to the console using print()",
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
              "name": "Declaring and initializing variables",
              "completed": false
            },
            {
              "id": 2,
              "name": "Basic data types (int, float, str, bool)",
              "completed": false
            },
            {
              "id": 3,
              "name": "Using type() to check data types",
              "completed": false
            },
            {
              "id": 4,
              "name": "Type casting (implicit and explicit)",
              "completed": false
            },
            {
              "id": 5,
              "name": "Dynamic typing in Python",
              "completed": false
            },
            {
              "id": 6,
              "name": "Constants and naming conventions",
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
              "name": "Using input() for user input (Advanced)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Printing to the console using print()(Advanced)",
              "completed": false
            },
            {
              "id": 3,
              "name": "String formatting with f-strings, .format(), and %",
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
              "name": "Arithmetic operators (+, -, *, /, //, %, **)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Relational operators (==, !=, >, <, >=, <=)",
              "completed": false
            },
            {
              "id": 3,
              "name": "Logical operators (and, or, not)",
              "completed": false
            },
            {
              "id": 4,
              "name": "Bitwise operators (&, |, ^, ~, <<, >>)",
              "completed": false
            },
            {
              "id": 5,
              "name": "Assignment operators (=, +=, -=, etc.)",
              "completed": false
            },
            {
              "id": 6,
              "name": "Membership operators (in, not in)",
              "completed": false
            },
            {
              "id": 7,
              "name": "Identity operators (is, is not)",
              "completed": false
            },
            {
              "id": 8,
              "name": "Ternary operator",
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
              "name": "if and else statements",
              "completed": false
            },
            {
              "id": 2,
              "name": "elif for multiple conditions",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested if statements",
              "completed": false
            },
            {
              "id": 4,
              "name": "Using conditional expressions (ternary operator)",
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
              "name": "for loops",
              "completed": false
            },
            {
              "id": 2,
              "name": "while loops",
              "completed": false
            },
            {
              "id": 3,
              "name": "Nested loops",
              "completed": false
            },
            {
              "id": 4,
              "name": "Control flow in loops (break, continue, pass)",
              "completed": false
            },
            {
              "id": 5,
              "name": "Iterating with range()",
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
              "name": "Declaring and initializing strings",
              "completed": false
            },
            {
              "id": 2,
              "name": "String methods (.upper(), .lower(), .strip(), .replace(), .find(), .split(), .join(), etc.)",
              "completed": false
            },
            {
              "id": 3,
              "name": "String slicing and indexing",
              "completed": false
            },
            {
              "id": 4,
              "name": "String immutability",
              "completed": false
            },
            {
              "id": 5,
              "name": "Multi-line strings with triple quotes",
              "completed": false
            },
            {
              "id": 6,
              "name": "Iterating over strings using loops",
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
              "name": "Declaring and initializing lists",
              "completed": false
            },
            {
              "id": 2,
              "name": "Accessing and modifying list elements",
              "completed": false
            },
            {
              "id": 3,
              "name": "List methods (.append(), .extend(), .insert(), .remove(), .pop(), .index(), .sort(), .reverse(), etc.)",
              "completed": false
            },
            {
              "id": 4,
              "name": "List slicing and indexing",
              "completed": false
            },
            {
              "id": 5,
              "name": "Nested lists (2D lists)",
              "completed": false
            },
            {
              "id": 6,
              "name": "List comprehensions",
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
              "name": "Creating and accessing tuples",
              "completed": false
            },
            {
              "id": 2,
              "name": "Tuple immutability and unpacking",
              "completed": false
            },
            {
              "id": 3,
              "name": "Creating and using sets",
              "completed": false
            },
            {
              "id": 4,
              "name": "Set operations (union, intersection, difference, symmetric_difference)",
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
              "name": "Creating and accessing dictionaries",
              "completed": false
            },
            {
              "id": 2,
              "name": "Adding, updating, and deleting key-value pairs",
              "completed": false
            },
            {
              "id": 3,
              "name": "Dictionary methods (.keys(), .values(), .items(), .get(), .pop(), .update())",
              "completed": false
            },
            {
              "id": 4,
              "name": "Iterating through dictionaries",
              "completed": false
            },
            {
              "id": 5,
              "name": "Nested dictionaries and dictionary comprehension",
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
              "name": "Defining and calling functions",
              "completed": false
            },
            {
              "id": 2,
              "name": "Function parameters and arguments (positional, keyword, default)",
              "completed": false
            },
            {
              "id": 3,
              "name": "Return values and the return keyword",
              "completed": false
            },
            {
              "id": 4,
              "name": "Variable scope (global vs. local)",
              "completed": false
            },
            {
              "id": 5,
              "name": "Lambda functions",
              "completed": false
            },
            {
              "id": 6,
              "name": "Higher-order functions",
              "completed": false
            },
            {
              "id": 7,
              "name": "Recursion",
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
              "name": "Classes and objects",
              "completed": false
            },
            {
              "id": 2,
              "name": "Attributes and methods",
              "completed": false
            },
            {
              "id": 3,
              "name": "Constructors (init())",
              "completed": false
            },
            {
              "id": 4,
              "name": "self parameter",
              "completed": false
            },
            {
              "id": 5,
              "name": "Inheritance",
              "completed": false
            },
            {
              "id": 6,
              "name": "Polymorphism (method overriding)",
              "completed": false
            },
            {
              "id": 7,
              "name": "Encapsulation (private and protected members)",
              "completed": false
            },
            {
              "id": 8,
              "name": "Static methods and class methods",
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
              "name": "Importing modules (import, from ... import)",
              "completed": false
            },
            {
              "id": 2,
              "name": "Common built-in modules (os, math, random, datetime)",
              "completed": false
            },
            {
              "id": 3,
              "name": "Creating custom modules",
              "completed": false
            },
            {
              "id": 4,
              "name": "Using and managing Python packages with pip",
              "completed": false
            }
          ]
        }
      ]
    }];



      
  module.exports = defaultTopics;