
// Shared Node classes


class Node {
    constructor(data) {
        this.data = data;   
        this.next = null;   
    }
}

class QueueNode {
    constructor(data) {
        this.data = data;   
        this.next = null;  
    }
}


module.exports = { Node, QueueNode };