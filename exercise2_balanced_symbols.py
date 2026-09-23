def is_balanced(text):

    stack = []

    matching_symbols = {')': '(',
                        '}': '{',
                        ']': '['}
    