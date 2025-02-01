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
        const { alltopics } = req.body;
        const topics = alltopics;
        let user = await User.findOne({ firebaseUserId: req.userId });
        if (!user) {
            return res.status(404).json(apiResponse.error('User not found'));
        }
        // Update user topics field directly instead of pushing
        user.topics = topics;
        await user.save();
        // Return updated topics to frontend
        res.json(apiResponse.success(user.topics, 'Topics saved'));
    } catch (error) {
        console.error('Error saving topics:', error);
        res.status(500).json(apiResponse.error('Error saving topics', error.message));
    }
};