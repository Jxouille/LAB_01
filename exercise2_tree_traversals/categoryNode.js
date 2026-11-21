// CategoryNode structure (same as Exercise 1) and the sample tree of the subject

class CategoryNode {
    constructor(category_id, name, post_count = 0) {
        this.category_id = category_id;
        this.name = name;
        this.post_count = post_count;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    set_left(child) {
        this.left = child;
        if (child !== null) child.parent = this;
        return child;
    }

    set_right(child) {
        this.right = child;
        if (child !== null) child.parent = this;
        return child;
    }

    is_leaf() {
        return this.left === null && this.right === null;
    }

    toString() {
        return `${this.name}(${this.post_count})`;
    }
}

//                 Technology(150)
//          Programming(85)        Design(65)
//       Python(42)    Java(30)  UI/UX(38)  Graphics(22)
//  Django(18) Flask(12)
function build_sample_tree() {
    const technology = new CategoryNode(1, "Technology", 150);
    const programming = technology.set_left(new CategoryNode(2, "Programming", 85));
    const design = technology.set_right(new CategoryNode(7, "Design", 65));
    const python = programming.set_left(new CategoryNode(3, "Python", 42));
    programming.set_right(new CategoryNode(6, "Java", 30));
    python.set_left(new CategoryNode(4, "Django", 18));
    python.set_right(new CategoryNode(5, "Flask", 12));
    design.set_left(new CategoryNode(8, "UI/UX", 38));
    design.set_right(new CategoryNode(9, "Graphics", 22));
    return technology;
}

module.exports = { CategoryNode, build_sample_tree };
