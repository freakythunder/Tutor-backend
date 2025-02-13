// utils/apiResponse.js
const success = (data, message = 'Success') => {
  console.log("Success:", data); 
  console.log("message:", message);
    return {
      success: true,
      data,
      message,
    };
  };
  
  const error = (message, code = 400) => {
    return {
      success: false,
      message,
      code,
    };
  };
  
  module.exports = { success, error };