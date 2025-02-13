// src/controllers/languageController.js

const User = require('../models/userModel');
const defaultTopics = require('../models/topicModel');
const apiResponse = require('../utils/apiResponse');

exports.getTopicsByLanguage = async (req, res) => {
    try {
      const language = req.body.language;
      let user = await User.findOne({ firebaseUserId: req.userId });
      if (!user) {
        return res.status(404).json(apiResponse.error('User not found'));
      }
        // If not, get topics from topic model
        const topic = defaultTopics.find(topic => topic.language === language);
        if (!topic) {
          return res.status(404).json(apiResponse.error('Language not found'));
        }
        // Update user topics field with the new topic
        user.topics.push({ language, topics: topic.topics });
        await user.save();
        // Return topics to frontend
        res.json(apiResponse.success(user.topics, 'Topics found'));
    } catch (error) {
      console.error('Error getting topics:', error);
      res.status(500).json(apiResponse.error('Error getting topics', error.message));
    }
  };

  exports.saveTopicsInUserProfile = async (req, res) => {
    try {
      console.log("Initial request body:", req.body);
      
      const user = await User.findOne({ firebaseUserId: req.userId });
      if (!user) {
        return res.status(404).json(apiResponse.error('User not found'));
      }
  
      // Extract topics array from request body
      const topics = Array.isArray(req.body) ? req.body : req.body.topics;
      console.log("Processed topics:", topics);
  
      // Validate topics
      if (!topics || !Array.isArray(topics)) {
        console.log("Invalid topics structure:", topics);
        return res.status(400).json(apiResponse.error('Invalid topics format'));
      }
  
      // Validate topic structure
      for (const topic of topics) {
        if (!topic.language || !Array.isArray(topic.topics)) {
          console.log("Invalid topic structure:", topic);
          return res.status(400).json(apiResponse.error('Each topic must have language and topics array'));
        }
      }
  
      user.topics = topics;
      await user.save();
      
      console.log('Topics saved successfully:', user.topics);
      return res.json(apiResponse.success(user.topics, 'Topics saved successfully'));
  
    } catch (error) {
      console.error('Error saving topics:', error);
      return res.status(500).json(apiResponse.error('Error saving topics', error.message));
    }
  };
  
  
  
  