
// Part C: Integrated Processor

const ActivityStack = require('./activityStack');
const NotificationQueue = require('./notificationQueue');

class FeedProcessor {
    constructor() {
        this.recent_activities = new ActivityStack();      
        this.notification_queue = new NotificationQueue(); 
        this.processed_log = new NotificationQueue();      
    }

    process_incoming() {
        if (this.notification_queue.is_empty()) {
            return null; 
        }
        
        let oldestNotification = this.notification_queue.dequeue(); 
        this.recent_activities.push(oldestNotification);            
        return oldestNotification;                                  
    }

    batch_process(k) {
        let processedCount = 0;
        
        while (processedCount < k && !this.notification_queue.is_empty()) {
            this.process_incoming(); 
            processedCount++;
        }
        
        return processedCount; 
    }

    clear_history() {
        let count = 0;
        
        while (!this.recent_activities.is_empty()) {
            let activity = this.recent_activities.pop(); 
            this.processed_log.enqueue(activity);       
            count++;
        }
        
        return count; 
    }

    get_stats() {
        return {
            recent_activities_size: this.recent_activities.size(),
            notification_queue_size: this.notification_queue.size(),
            processed_log_size: this.processed_log.size()
        };
    }
}

module.exports = FeedProcessor;