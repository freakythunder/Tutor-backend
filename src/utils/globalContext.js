let globalContext = {
    subtopicId: null,
  };
  
  module.exports.getSubtopicId = function() {
    return globalContext.subtopicId;
  };
  
  module.exports.updateSubtopicId = function(newSubtopicId) {
    globalContext.subtopicId = newSubtopicId;
  };