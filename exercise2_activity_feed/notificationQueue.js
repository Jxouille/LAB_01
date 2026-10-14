
//  Part B: Queue Structure

const { QueueNode } = require('./node');

class NotificationQueue {
    constructor() {
        this.front = null;  
        this.rear = null;   
        this._size = 0;    
    }

    is_empty() {
        return this.front === null;
    }

    size() {
        return this._size;
    }

    enqueue(notification) {
        let newNode = new QueueNode(notification); 
        
        if (this.rear === null) {                  
            this.front = newNode;                  
            this.rear = newNode;
        } else {                                   
            this.rear.next = newNode;              
            this.rear = newNode;                   
        }
        this._size++;                              
    }

    priority_enqueue(notification) {
        let newNode = new QueueNode(notification); 
        
        if (this.is_empty()) {                     
            this.front = newNode;                  
            this.rear = newNode;
        } else {                                   
            newNode.next = this.front;             
            this.front = newNode;                  
        }
        
        this._size++;                              
    }

    dequeue() {
        if (this.is_empty()) {
            return null; 
        }
        
        let notificationData = this.front.data; 
        this.front = this.front.next;           
        
        if (this.front === null) {              
            this.rear = null;                   
        }
        
        this._size--;                           
        return notificationData;                
    }

    front_item() {
        if (this.is_empty()) {
            return null; 
        }
        return this.front.data; 
    }

    display_pending() {
        let current = this.front; 
        let pendingNotifications = []; 
        
        while (current !== null) {
            pendingNotifications.push(current.data); 
            current = current.next;                  
        }
        
        return pendingNotifications; 
    }
}

module.exports = NotificationQueue;