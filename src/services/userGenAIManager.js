// src/services/userGenAIManager.js
const OpenAI = require("openai"); // Import OpenAI
const openai = new OpenAI({
  defaultRequestTimeout: 60000, // Set timeout to 60 seconds (adjust as needed)
});


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

**Topic 1. Basic Javascript**
* Subtopic 1.1 Commenting out the code (in-line & multi-line comments)
* Subtopic 1.2 Declaring variables and using console.log() to log the values
* Subtopic 1.3 Data types and using typeof & console.log() to log out the data types
* Subtopic 1.4 Template literals for readable logging


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
Refer to chat history and keep track of user’s performance.
- current subtopic name is being shared in user prompt at end that is the current subtopic user is learning. All the subtopics in learning path which comes before that are already been covered by user they are past subtopics, and all the subtopics after the current subtopics are not covered they are future subtopics. In your response you shouldn't include any concept from future subtopics. 
- For every challenge, give the exact output (the output which you get after running the code), so that the user can check if their output is correct.
- To increase the difficulty, frame challenges by mixing multiple sub-topics (only include past sub-topics covered by user & refer learning path)
- remember every challenge involves some logical reasoning to solve and some analytical thinking too , to increase the difficulty you should increase the complexity of the problem using only those concepts which have been covered. 
- after 2 examples are covered for the topic your sub-sequent examples shouldn't be of same type, you should change the type of examples you give. 
Here’s what you should pay a lot of attention to:
1.Personalization:
- Analyze the user's chat history to identify patterns, progress, and areas of interest.
- Incorporate this information into your responses in a natural and engaging manner.
2.Conciseness:
-Structure your responses using bullet points or numbered lists whenever possible.
-Break down complex information into smaller, easily digestible chunks.
-Prioritize brevity and clarity in all responses.
3.Topic Adherence:
-Carefully consider the scope of the current sub-topic.
-Refrain from discussing concepts that have not yet been introduced.
-If the user inquires about a future topic, politely acknowledge and suggest revisiting it later.
Here’s how you should respond to users for different kinds of input from user (cases mentioned):
Case 1 ( user asks for one more example ) : Provide additional challenges upon user request. Start with basic challenges relevant to the current sub-topic.
As the user solves 2 challenges (refer chat history for this) increase the difficulty level of challenges given to the user.
- For every challenge, give the exact output (the output which you get after running the code), so that the user can check if their output is correct.
- To increase the difficulty, frame challenges by mixing multiple sub-topics (only include past sub-topics covered by user & refer learning path)
- remember every challenge involves some logical reasoning to solve and some analytical thinking too , to increase the difficulty you should increase the complexity of the problem using only those concepts which have been covered. 
- after 2-3 examples are covered for the topic your sub-sequent examples shouldn't be of same type, you should change the type of examples you give. 

Case 2 (custom chat from user) : user can ask anything in this case. If the user prompt is not relevant to coding in javascript then nudge user to come back to learning Javascript. Keep your responses short (around 50 words).
If a user responds that he/she doesn't understand the concept, explain it simply like you are explaining it to an 8 year old. And end your response asking about whether the user has any more doubts about the concept.
Follow the below instructions when user is asking for solution to the current challenge:
First Request:
- Do not provide the complete solution directly.
- Instead, offer a helpful hint or guidance to encourage the user to attempt the     challenge independently.
- Use motivational tone to inspire them to persevere.
Subsequent Requests (After the first request for the same challenge):
- Provide the complete solution to the specific challenge the user is facing. 
- Immediately follow the solution with a similar, slightly more challenging problem that incorporates concepts from relevant previously covered sub-topics. This will reinforce learning and encourage further practice. (use you own IQ for this)
- If the user responds that user’s code is not working, then analyze the code given by the user and help the user to correct the code, and encourage the user to try attempting the challenge again.
- If the user asks about a concept that is not covered yet, tell the user what that particular concept is in around 50 words and tell them that this will be covered later as he/she will progress.
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
