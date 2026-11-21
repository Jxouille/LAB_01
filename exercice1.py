from collections import deque


class CategoryNode:
    def __init__(self, category_id, name, post_count):
        self.category_id = category_id
        self.name = name
        self.post_count = post_count
        self.left = None
        self.right = None
        self.parent = None

    def __repr__(self):
        return f"CategoryNode({self.category_id}, {self.name!r})"


class BinaryCategoryTree:
    def __init__(self, root=None):
        self.root = root

    @staticmethod
    def add_child(parent_node, child, is_left):
        child.parent = parent_node
        if is_left:
            parent_node.left = child
        else:
            parent_node.right = child

    def calculate_height(self, node):
        if node is None:
            return -1
        return 1 + max(self.calculate_height(node.left),
                       self.calculate_height(node.right))

    def calculate_node_depth(self, node, target_id):
        target = self.find_category(target_id, node)
        if target is None:
            return -1
        depth = 0
        while target.parent is not None:
            depth += 1
            target = target.parent
        return depth

    def count_nodes(self, node):
        if node is None:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)

    def count_leaves(self, node):
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self.count_leaves(node.left) + self.count_leaves(node.right)

    def is_balanced(self, node):
        if node is None:
            return True
        left_h = self.calculate_height(node.left)
        right_h = self.calculate_height(node.right)
        if abs(left_h - right_h) > 1:
            return False
        return self.is_balanced(node.left) and self.is_balanced(node.right)

    def is_full_binary_tree(self, node):
        if node is None:
            return True
        if node.left is None and node.right is None:
            return True
        if node.left is not None and node.right is not None:
            return (self.is_full_binary_tree(node.left)
                    and self.is_full_binary_tree(node.right))
        return False

    def is_perfect_binary_tree(self, node):
        h = self.calculate_height(node)
        n = self.count_nodes(node)
        return n == 2 ** (h + 1) - 1

    def is_complete_binary_tree(self, root):
        if root is None:
            return True
        queue = deque([root])
        flag = False
        while queue:
            current = queue.popleft()
            if current is None:
                flag = True
            else:
                if flag:
                    return False
                queue.append(current.left)
                queue.append(current.right)
        return True

    def find_category(self, category_id, node):
        if node is None:
            return None
        if node.category_id == category_id:
            return node
        left_res = self.find_category(category_id, node.left)
        if left_res is not None:
            return left_res
        return self.find_category(category_id, node.right)

    def find_path_to_root(self, category_id, node):
        path = []
        curr = self.find_category(category_id, node)
        while curr is not None:
            path.append(curr.name)
            curr = curr.parent
        return path

    def lowest_common_ancestor(self, id1, id2, root):
        if root is None:
            return None
        if root.category_id in (id1, id2):
            return root
        left_lca = self.lowest_common_ancestor(id1, id2, root.left)
        right_lca = self.lowest_common_ancestor(id1, id2, root.right)
        if left_lca is not None and right_lca is not None:
            return root
        return left_lca if left_lca is not None else right_lca


class StoryNode:
    def __init__(self, story_id, title="", views=0):
        self.story_id = story_id
        self.title = title
        self.views = views
        self.prev = None
        self.next = None

    def __repr__(self):
        return f"StoryNode({self.story_id}, views={self.views})"


class StoryList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.current = None
        self.size = 0


    def add_story(self, new_story):
        new_story.prev = self.tail
        new_story.next = None
        if self.tail is not None:
            self.tail.next = new_story
        else:
            self.head = new_story
        self.tail = new_story
        if self.current is None:
            self.current = new_story
        self.size += 1

    def remove_story(self, story_id):
        temp = self.head
        while temp is not None:
            if temp.story_id == story_id:
                if temp.prev is not None:
                    temp.prev.next = temp.next
                else:
                    self.head = temp.next
                if temp.next is not None:
                    temp.next.prev = temp.prev
                else:
                    self.tail = temp.prev
                if self.current is temp:
                    self.current = temp.next or temp.prev
                temp.prev = temp.next = None
                self.size -= 1
                return temp
            temp = temp.next
        return None


    def insert_after(self, current_id, new_story):
        temp = self.head
        while temp is not None:
            if temp.story_id == current_id:
                new_story.next = temp.next
                new_story.prev = temp
                if temp.next is not None:
                    temp.next.prev = new_story
                else:
                    self.tail = new_story
                temp.next = new_story
                self.size += 1
                return True
            temp = temp.next
        return False

    def display_around_current(self, k):
        if self.current is None:
            return []
        result = []
        temp = self.current
        count = 0
        while temp.prev is not None and count < k:
            temp = temp.prev
            count += 1
        while temp is not None and len(result) < 2 * k + 1:
            result.append(temp)
            temp = temp.next
        return result

    @staticmethod
    def track_view(node):
        if node is not None:
            node.views += 1

    def most_viewed(self):
        if self.head is None:
            return None
        max_node = self.head
        temp = self.head.next
        while temp is not None:
            if temp.views > max_node.views:
                max_node = temp
            temp = temp.next
        return max_node

    def reordering_by_views(self):
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

    def __iter__(self):
        temp = self.head
        while temp is not None:
            yield temp
            temp = temp.next


if __name__ == "__main__":
    tree = BinaryCategoryTree(CategoryNode(1, "Tech", 10))
    py, java = CategoryNode(2, "Python", 5), CategoryNode(3, "Java", 3)
    fa, dj = CategoryNode(4, "FastAPI", 2), CategoryNode(5, "Django", 1)
    tree.add_child(tree.root, py, True)
    tree.add_child(tree.root, java, False)
    tree.add_child(py, fa, True)
    tree.add_child(py, dj, False)

    r = tree.root
    print("Hauteur       :", tree.calculate_height(r))
    print("Profondeur(4) :", tree.calculate_node_depth(r, 4))
    print("Nœuds/feuilles:", tree.count_nodes(r), tree.count_leaves(r))
    print("Équilibré     :", tree.is_balanced(r))
    print("Plein         :", tree.is_full_binary_tree(r))
    print("Parfait       :", tree.is_perfect_binary_tree(r))
    print("Complet       :", tree.is_complete_binary_tree(r))
    print("Chemin(5)     :", tree.find_path_to_root(5, r))
    print("LCA(4,5)      :", tree.lowest_common_ancestor(4, 5, r))
    print("LCA(4,3)      :", tree.lowest_common_ancestor(4, 3, r))

    stories = StoryList()
    for i, v in enumerate([3, 10, 1, 7]):
        stories.add_story(StoryNode(i, f"Story {i}", v))
    stories.insert_after(1, StoryNode(99, "Insérée", 5))
    print("\nListe         :", list(stories))
    print("Autour (k=1)  :", stories.display_around_current(1))
    print("Plus vue      :", stories.most_viewed())
    stories.reordering_by_views()
    print("Triée         :", list(stories))