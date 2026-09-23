def is_balanced(text):

    stack = []

    matching_symbols = {
        ')': '(',
        '}': '{',
        ']': '['
    }

    for char in text:
        if char in matching_symbols.values():
            stack.append(char)
        elif char in matching_symbols.keys():
            if not stack or stack.pop() != matching_symbols[char] or stack != []:
                return False
            else:
                return True