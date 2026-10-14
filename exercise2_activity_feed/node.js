
// Shared Node classes


class Node {
    constructor(data) {
        this.data = data;   // Stores the activity object
        this.next = null;   // Pointer to the next node underneath in the stack
    }
}

class QueueNode {
    constructor(data) {
        this.data = data;   // Stores the notification message/object
        this.next = null;   // Pointer to the next notification in line
    }
}

// Export classes so they can be imported in other files
module.exports = { Node, QueueNode };