
//Part A: Stack Structure

const { Node } = require('./node');

class ActivityStack {
    constructor() {
        this.top = null;    
        this._size = 0;     
    }

    is_empty() {
        return this.top === null;
    }

    size() {
        return this._size;
    }

    push(activity) {
        let newNode = new Node(activity); 
        newNode.next = this.top;          
        this.top = newNode;               
        this._size++;                     
    }

    pop() {
        if (this.is_empty()) {
            return null; 
        }
        let poppedData = this.top.data; 
        this.top = this.top.next;       
        this._size--;                   
        return poppedData;              
    }

    peek() {
        if (this.is_empty()) return null;
        return this.top.data;
    }

    display_recent(n) {
        let current = this.top; 
        let count = 0;
        let results = [];
        
        while (current !== null && count < n) {
            results.push(current.data); 
            current = current.next;     
            count++;
        }
        return results; 
    }
}

class ActivityFeedWithUndo {
    constructor() {
        this.activityStack = new ActivityStack(); 
        this.undoStack = new ActivityStack();     
    }

    performAction(activity) {
        this.activityStack.push(activity);
    }

    undo_last() {
        if (this.activityStack.is_empty()) {
            return null; 
        }
        let actionToUndo = this.activityStack.pop(); 
        this.undoStack.push(actionToUndo);           
        return actionToUndo;
    }
}

module.exports = ActivityStack;