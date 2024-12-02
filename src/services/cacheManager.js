class CacheManager {
    constructor() {
      this.conversationCache = new Map();
      this.CACHE_LIMIT = 10;
      this.CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours
    }
  
    // Initialize cache for a user with initial conversations
    initializeCache(userId, conversations) {
      const cachedConversations = conversations.slice(0, this.CACHE_LIMIT).map(conv => ({
        userMessage: conv.userMessage,
        aiResponse: conv.aiResponse,
        timestamp: conv.timestamp || new Date()
      }));
  
      this.conversationCache.set(userId, {
        conversations: cachedConversations,
        lastUpdated: Date.now()
      });
      console.log(`User  added to cache: ${userId}. Current cache size: ${this.conversationCache.size}`);
    }
  
    // Get conversations from cache
    getConversations(userId) {
      const cachedData = this.conversationCache.get(userId);
      
      // Check cache expiry
      if (!cachedData || (Date.now() - cachedData.lastUpdated > this.CACHE_EXPIRY_TIME)) {
        this.clearCache(userId);
        return [];
      }
  
      return cachedData.conversations.slice(0, 5) || [];
    }
  
    // Update cache with new conversation
    updateCache(userId, newConversation) {
      let cachedData = this.conversationCache.get(userId);
  
      if (!cachedData) {
        cachedData = { conversations: [], lastUpdated: Date.now() };
      }
  
      // Add new conversation to the beginning
      cachedData.conversations.unshift({
        userMessage: newConversation.userMessage,
        aiResponse: newConversation.aiResponse,
        timestamp: new Date()
      });
  
      // Limit to CACHE_LIMIT conversations
      if (cachedData.conversations.length > this.CACHE_LIMIT) {
        cachedData.conversations = cachedData.conversations.slice(0, this.CACHE_LIMIT);
      }
  
      // Update last updated timestamp
      cachedData.lastUpdated = Date.now();
  
      // Store updated cache
      this.conversationCache.set(userId, cachedData);
    }
  
    // Clear cache for a specific user
    clearCache(userId) {
      this.conversationCache.delete(userId);
      console.log(`User  removed from cache: ${userId}. Current cache size: ${this.conversationCache.size}`);
    }
  
    // Clear all expired caches
    clearExpiredCaches() {
      const now = Date.now();
      for (const [userId, cachedData] of this.conversationCache.entries()) {
        if (now - cachedData.lastUpdated > this.CACHE_EXPIRY_TIME) {
          this.conversationCache.delete(userId);
          console.log(`Cache cleared for expired user: ${userId}. Current cache size: ${this.conversationCache.size}`);
        }
      }
    }
  
    // Start periodic cache cleanup
    startCacheCleanup() {
      setInterval(() => {
        this.clearExpiredCaches();
      }, this.CACHE_EXPIRY_TIME);
    }
  }
  
  module.exports = new CacheManager();