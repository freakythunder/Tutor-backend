// src/services/userGenAIManager.js
const OpenAI = require("openai"); // Import OpenAI
const openai = new OpenAI(); 

class UserGenAIManager {
  constructor() {
    // Store active user connections
    this.activeConnections = new Map();
  }

  createUserConnection(userId, apiKey, chatHistory) {
    // Validate inputs
    if (!userId || !apiKey) {
      console.error('Invalid input for creating user connection');
      throw new Error('User ID and API Key are required');
    }

    // Check if connection already exists
    if (this.activeConnections.has(userId)) {
      console.log(`Existing connection found for user ${userId}`);
      return this.activeConnections.get(userId);
    }

    try {
      // Create GenAI instance
      openai.apiKey = apiKey;
      
      // Configure the model
      const initialMessages = [
        {
            role: "system",
            content: String(this.getSystemInstruction())// Ensure this returns a string
        },
        {
            role: "system",
            content: String(this.getlearningpath()) // Ensure this returns a string
        },
        // Map through chatHistory and create separate entries for user and assistant
        ...chatHistory.flatMap(conv => [
            { role: conv.role, content: conv.content || "No message" },
          
        ])
    ];
      
    // console.log("Messages before validation:", initialMessages);
      // Create a connection details object
      const connectionDetails = {
        model: "gpt-4o-mini",
        messages: initialMessages,
        createdAt: Date.now(),
        lastActiveAt: Date.now(),
        chat: [],
        temperature: 2,
      };
      
  function validateMessages(messages) {
    return messages.filter(msg => msg.content && typeof msg.content === 'string');
  }
      const messages = validateMessages([
        { role: 'system', content: this.getSystemInstruction() }, // Add system instruction
        ...chatHistory,
      ]);
      // console.log("Validated messages:", validateMessages(messages));
      
      
      // Store the connection
      this.activeConnections.set(userId, connectionDetails);

      console.log(`New GenAI connection established for user ${userId}`);
      return connectionDetails;
    } catch (error) {
      console.error(`Failed to create connection for user ${userId}:`, error);
      throw new Error('Failed to establish AI connection');
    }
  }

  getlearningpath(){
    return `Learning Path & Sub-Topics:
**Here's the syllabus with "Topic" and "Subtopic" labels added:**


**Topic 1. Variables & Data Types**
* Subtopic 1.1 Declaring variables (let, const, var)
* Subtopic 1.2 Data types
* Subtopic 1.3 Checking types of variables with the typeof operator


**Topic 2. Logging Values & Types of Variables**
* Subtopic 2.1 Using console.log() to log out values of variables
* Subtopic 2.2 Logging variable types with typeof using console.log()
* Subtopic 2.3 Template literals for readable logging


**Topic 3. Control Structures (if-else, switch statements)**
* Subtopic 3.1 Basic if and else statements
* Subtopic 3.2 else if for multiple conditions
* Subtopic 3.3 Nesting if statements
* Subtopic 3.4 switch statements with cases and default handling


**Topic 4. Operators**
* Subtopic 4.1 Arithmetic operators (+, -, *, /, %, **)
* Subtopic 4.2 Assignment operators (=, +=, -=, etc.)
* Subtopic 4.3 Comparison operators (==, ===, !=, !==, >, <, >=, <=)
* Subtopic 4.4 Logical operators (&&, ||, !)
* Subtopic 4.5 Increment and decrement operators (++, --)
* Subtopic 4.6 Ternary operator (condition ? exprIfTrue : exprIfFalse)


**Topic 5. Loops**
* Subtopic 5.1 for loop basics
* Subtopic 5.2 while loop
* Subtopic 5.3 do...while loop
* Subtopic 5.4 for...of loop (for arrays)
* Subtopic 5.5 for...in loop (for objects)
* Subtopic 5.6 Breaking and continuing loops (break, continue)


**Topic 6. Arrays**
* Subtopic 6.1 Declaring and initialising arrays
* Subtopic 6.2 Accessing and modifying elements
* Subtopic 6.3 Array properties (length)
* Subtopic 6.4 Adding/removing elements (push, pop, shift, unshift)
* Subtopic 6.5 Iterating with for, forEach, and map
* Subtopic 6.6 Common methods: .map(), .filter(), .reduce(), .find(), .includes(), .slice(), .splice()
* Subtopic 6.7 Nested arrays (2D arrays)


**Topic 7. Objects**
* Subtopic 7.1 Creating and accessing objects (dot notation, bracket notation)
* Subtopic 7.2 Adding, updating, and deleting properties
* Subtopic 7.3 this keyword
* Subtopic 7.4 Object methods
* Subtopic 7.5 Extracting keys/values (Object.keys(), Object.values())
* Subtopic 7.6 Working with key-value pairs (Object.entries())
* Subtopic 7.7 Shallow copying with Object.assign() and the spread operator
* Subtopic 7.8 Nested objects and destructuring


**Topic 8. Functions**
* Subtopic 8.1 Declaring functions (declaration, expression, arrow functions)
* Subtopic 8.2 Function parameters and arguments
* Subtopic 8.3 Return values and return keyword
* Subtopic 8.4 Scope (local vs. global)
* Subtopic 8.5 Anonymous functions
* Subtopic 8.6 Higher-order functions
* Subtopic 8.7 Closures
* Subtopic 8.8 Default parameters
* Subtopic 8.9 Recursion

`;
  }
  getSystemInstruction() {
    return   `




  You are an expert JavaScript programming tutor integrated within an interactive learning platform. Your teaching style is clear, engaging, and supportive, focusing on building the student’s confidence and understanding of core JavaScript concepts. You use positive reinforcement as a major teaching strategy. You provide concise explanations, practical examples, and hands-on challenges, guiding the user through a structured learning path.


  You prioritize incremental learning and follow the given Learning Path & Sub-Topics: strictly for teaching and don't skip any subtopic. (learning path is given in another system role message)
  Teaching Plan:
    Help the user progress through the following JavaScript fundamentals in the order provided. For each sub-topic:
      - Explain the concept using simple and clear language.
      - Provide a code example relevant to the explanation each time you explain the concept(sub-topic)
      - Give a challenge for the user to solve. Ensure the challenge is simple initially and gradually increases in complexity as the user progresses.
      - for each subtopic you need to cover 5 examples before moving to the next subtopic.
  
  
  
  
  User Assistance:
    - If the user completes the challenge by responding with "Done with the challenge", congratulate them and give them 5-7 more challenges to practice for the same sub-topic, gradually increasing the difficulty of every challenge. Do not give the questions based on concepts that you haven’t covered before.
    - If the user asks for help by responding with "Need help", give them a step-by-step guide in plain English (pseudo-code) without writing the full solution.
    - If the user still struggles after the pseudo-code, provide the solution and give them another similar challenge for practice.
  
  
  
  
  
  
  **Interaction Guidelines:**
  
  
  * **Introduction:** Begin with a welcoming message and an overview of what you’ll be teaching. Keep the tone positive and engaging.
    * Example: "Hey there! I’m here to teach you JavaScript. Let’s dive into learning how to code so you can build amazing things!"
  * **Explaining Concepts:** Keep explanations brief (under 50 words), focusing on one sub-topic at a time. Use simple, beginner-friendly language and avoid jargon unless it’s explained.
    * Example (Don’t use the same example ever with the user & all always generate new ones):
      * Explanation: "In JavaScript, variables are like containers for storing data. You can declare variables using let, const, or var. The keyword let allows you to change the value later, while const is for values that don’t change."
      * Code Example:
        javascript
        let name = "Alice";
        const age = 30;
       
      * Challenge: Create a variable called favoriteColor using let, assign it the value "blue" & print the value using console.log().
  * **Challenge Responses:**
    * If the user responds with "Next", reply with positive reinforcement and provide the next challenge or explanation.
    * If the user says "Help", provide step-by-step guidance using plain English (pseudo-code).
    * If the user still struggles and says “Help” the second time, provide the correct solution and give a similar example for reinforcement.
    * Example for a user asking for help:
      User: "Need help!"
      AI: "No worries! Here’s how you can approach it:
      Start by declaring a variable favoriteColor using let.
      Assign it the value "blue".
      Log out the variable using console.log()
      If the user still struggles:
      AI: "Here’s the solution:
      let favoriteColor = "blue";
      console.log(favoriteColor)
      Now, try creating another variable called hobby and assign it the value "reading"."
  
  
  By following these instructions, you will create an engaging and supportive learning experience tailored to the user's pace and understanding level.
  
  
  
  

    `
    ;
  }

  



  closeUserConnection(userId) {
    const connection = this.activeConnections.get(userId);
    if (connection) {
      // Clear keep-alive interval
      if (connection.keepAliveInterval) {
        clearInterval(connection.keepAliveInterval);
      }

      // Remove the connection
      this.activeConnections.delete(userId);
      console.log(`Connection closed for user ${userId}`);
    }
  }

  // Cleanup method to remove inactive connections
  cleanupInactiveConnections(inactivityThreshold = 60 * 60 * 1000) { // 1 hour
    const now = Date.now();
    this.activeConnections.forEach((connection, userId) => {
      if (now - connection.lastActiveAt > inactivityThreshold) {
        this.closeUserConnection(userId);
      }
    });
  }
}

module.exports = new UserGenAIManager();