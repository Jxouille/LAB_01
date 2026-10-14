class StoryNode:
    def __init__(self, story_id: int, user_id: str, content_preview: str, timestamp: str, views: int = 0):
        self.story_id = story_id
        self.user_id = user_id
        self.content_preview = content_preview
        self.timestamp = timestamp
        self.views = views
        self.next = None  
        self.prev = None

    def __repr__(self):
        return f'[Story {self.story_id}: "{self.content_preview}" (Views: {self.views})]'

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.current = None
        self.size = 0

    def add_story(self, node):
        if self.head is None:
            self.head = node
            self.tail = node
            self.current = node
        else:
            self.tail.next = node
            node.prev = self.tail
            self.tail = node
        self.size += 1

    def move_forward(self):
        if self.current and self.current.next:
            self.current = self.current.next
            return self.current
        return None

    def move_backward(self):
        if self.current and self.current.prev:
            self.current = self.current.prev
            return self.current
        return None

    def jump_to(self, story_id):
        temp = self.head
        while temp:
            if temp.story_id == story_id:
                self.current = temp
                return self.current
            temp = temp.next
        return None

    def insert_after(self, current_id, new_story):
        temp = self.head
        while temp:
            if temp.story_id == current_id:
                if temp == self.tail:
                    self.add_story(new_story)
                    return True

                new_story.next = temp.next
                new_story.prev = temp
                temp.next.prev = new_story
                temp.next = new_story
                self.size += 1
                return True
            temp = temp.next
        return False


            