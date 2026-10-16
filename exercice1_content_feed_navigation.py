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

    def remove_story(self, story_id):
        temp = self.head
        while temp:
            if temp.story_id == story_id:
                if temp.prev:
                    temp.prev.next = temp.next
                else:
                    self.head = temp.next

                if temp.next:
                    temp.next.prev = temp.prev
                else:
                    self.tail = temp.prev

                if self.current == temp:
                    self.current = temp.next if temp.next else temp.prev

                self.size -= 1
                return True
            temp = temp.next
        return False

    def display_around_current(self, k):
        if not self.current:
            print("Feed")
            return []

        before = []
        temp = self.current.prev
        count = 0
        while temp and count < k:
            before.append(temp)
            temp = temp.prev
            count += 1
        before.reverse()

        after = []
        temp = self.current.next
        count = 0
        while temp and count < k:
            after.append(temp)
            temp = temp.next
            count += 1

        result = before + [self.current] + after
        print(" <-> ".join(str(node) for node in result))
        return result

    def track_view(self):
        if self.current:
            self.current.views += 1

    def most_viewed(self):
        if not self.head:
            return None

        max_node = self.head
        temp = self.head.next

        while temp:
            if temp.views > max_node.views:
                max_node = temp
            temp = temp.next
        return max_node

    def reorder_by_views(self):
        if self.size <= 1:
            return

        saved_current = self.current

        sorted_nodes = []
        while self.head is not None:
            best_node = self.most_viewed()
            self.remove_story(best_node.story_id)
            sorted_nodes.append(best_node)


        for node in sorted_nodes:
            node.prev = None
            node.next = None
            self.add_story(node)

        self.current = saved_current



if __name__ == "__main__":
    feed = DoublyLinkedList()
    feed.add_story(StoryNode(1, "userA", "Morning coffee", "08:00"))
    feed.add_story(StoryNode(2, "userB", "Workout complete", "10:00"))
    feed.add_story(StoryNode(3, "userC", "Sunset photo", "19:00"))

    print("1. Feed initial :")
    feed.display_around_current(5)

    feed.jump_to(2)
    feed.track_view()
    feed.track_view()

    feed.move_forward()
    feed.track_view()

    print("\n2. Story la plus vue :", feed.most_viewed())

    feed.reorder_by_views()
    print("\n3. Feed après reorder_by_views() :")
    feed.display_around_current(5)