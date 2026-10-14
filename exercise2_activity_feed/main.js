
// Main and tests
const FeedProcessor = require('./feedProcessor');

// Initialize the integrated feed system
const feed = new FeedProcessor();

// Test the modules
feed.notification_queue.enqueue("New like on your post");
feed.notification_queue.enqueue("New comment");
feed.notification_queue.priority_enqueue("URGENT: Security alert");

console.log("Initial pending notifications:", feed.notification_queue.display_pending());

feed.batch_process(2);
console.log("Stats after batch processing:", feed.get_stats());
console.log("Recent activities stack:", feed.recent_activities.display_recent(2));