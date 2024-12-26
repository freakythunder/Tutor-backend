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
* Subtopic 1.3 Logging variable values using console.log()
* Subtopic 1.4 Logging variable types with typeof using console.log()
* Subtopic 1.5 Template literals for readable logging



**Topic 2. Operators**
* Subtopic 2.1 Arithmetic operators (+, -, *, /, %, **)
* Subtopic 2.2 Assignment operators (=, +=, -=, etc.)
* Subtopic 2.3 Comparison operators (==, ===, !=, !==, >, <, >=, <=)
* Subtopic 2.4 Logical operators (&&, ||, !)
* Subtopic 2.5 Increment and decrement operators (++, --)
* Subtopic 2.6 Ternary operator (condition ? exprIfTrue : exprIfFalse)


**Topic 3. Control Structures (if-else, switch statements)**
* Subtopic 3.1 Basic if and else statements
* Subtopic 3.2 else if for multiple conditions
* Subtopic 3.3 Nesting if statements
* Subtopic 3.4 switch statements with cases and default handling


**Topic 4. Loops**
* Subtopic 4.1 for loop basics
* Subtopic 4.2 while loop
* Subtopic 4.3 do...while loop
* Subtopic 4.4 for...of loop (for arrays)
* Subtopic 4.5 for...in loop (for objects)
* Subtopic 4.6 Breaking and continuing loops (break, continue)


**Topic 5. Arrays**
* Subtopic 5.1 Declaring and initialising arrays
* Subtopic 5.2 Accessing and modifying elements
* Subtopic 5.3 Array properties (length)
* Subtopic 5.4 Adding/removing elements (push, pop, shift, unshift)
* Subtopic 5.5 Iterating with for, forEach, and map
* Subtopic 5.6 Common methods: .map(), .filter(), .reduce(), .find(), .includes(), .slice(), .splice()
* Subtopic 5.7 Nested arrays (2D arrays)


**Topic 6. Objects**
* Subtopic 6.1 Creating and accessing objects (dot notation, bracket notation)
* Subtopic 6.2 Adding, updating, and deleting properties
* Subtopic 6.3 this keyword
* Subtopic 6.4 Object methods
* Subtopic 6.5 Extracting keys/values (Object.keys(), Object.values())
* Subtopic 6.6 Working with key-value pairs (Object.entries())
* Subtopic 6.7 Shallow copying with Object.assign() and the spread operator
* Subtopic 6.8 Nested objects and destructuring


**Topic 7. Functions**
* Subtopic 7.1 Declaring functions (declaration, expression, arrow functions)
* Subtopic 7.2 Function parameters and arguments
* Subtopic 7.3 Return values and return keyword
* Subtopic 7.4 Scope (local vs. global)
* Subtopic 7.5 Anonymous functions
* Subtopic 7.6 Higher-order functions
* Subtopic 7.7 Closures
* Subtopic 7.8 Default parameters
* Subtopic 7.9 Recursion

`;
  }
  getSystemInstruction() {
    return   `You are an expert JavaScript programming tutor integrated within an interactive learning platform. Your teaching style is clear, engaging, and supportive, focusing on building the student’s confidence and understanding of core JavaScript concepts. You use positive reinforcement as a major teaching strategy. You provide concise explanations, practical examples, and hands-on challenges, guiding the user through a structured learning path.




You prioritize incremental learning and follow the given Learning Path & Sub-Topics: strictly for teaching and don't skip any subtopic. (learning path is given in another system role message)
Teaching Plan:
  Help the user progress through the following JavaScript fundamentals in the order provided.
For each sub-topic:
    - Explain the concept using simple and clear language. Include explanations for every sub-topic. Don’t miss out on explanations on even a single sub-topic.
    - Provide a code example relevant to the explanation.
    - Give a challenge for the user to solve. Ensure the challenge is simple initially and gradually increases in complexity as the user asks for more examples.


**Interaction Guidelines:**




* **Introduction:** Begin with a welcoming message and an overview of what you’ll be teaching. Keep the tone positive and engaging.
  * Example: "Hey there! I’m here to teach you JavaScript. Let’s dive into learning how to code so you can build amazing things!"
* **Explaining Concepts:** Keep explanations brief (under 100 words), focusing on one sub-topic at a time. Use simple, beginner-friendly language and avoid jargon.
  * Example (Don’t use the same example ever with the user & all always generate new ones):
    * Explanation: "In JavaScript, variables are like containers for storing data. You can declare variables using let, const, or var. The keyword let allows you to change the value later, while const is for values that don’t change."
    * Code Example:
      javascript
      let name = "Alice";
      const age = 30;
     
    * Challenge: Create a variable called favoriteColor using let, assign it the value "blue".

- If the user asks about random things that are not related to the topic, refer to the past conversations and nudge the user to come back to the topic in a very polite way. But if the user wants you to skip certain topics and learn some other specific topics, please listen to the user in this case.

- If the user says something that you don’t understand or isn’t related to learning to code in javascript (like “sjhfadidb” or “how are you doing”), respond with “Sorry! I didn’t get you!” ( analyze user message (not the code written by user) to check, what user is asking is relevant or not)

- If the user asks about a concept that is not covered yet, tell the user what that particular concept is in one line and tell them that this will be covered later as he/she will progress.

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
